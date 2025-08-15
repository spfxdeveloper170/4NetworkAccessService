import * as React from "react";
import { useState, useRef, useEffect } from "react";
import {
  TextField,
  PrimaryButton,
  DefaultButton,
  Dropdown,
  DatePicker,
  DayOfWeek,
  mergeStyles,
  defaultDatePickerStrings,
  mergeStyleSets,
  Icon,
  TooltipHost,
} from "@fluentui/react";
import { Stack } from "@fluentui/react/lib/Stack";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import "../css/style.css";
import {
  IUserProfile,
  IServiceRequestFormData,
  IServiceProps,
} from "../webparts/service/components/IServiceProps";
import {
  IPeoplePickerContext,
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { Col } from "react-bootstrap";
import TextfieldTipLabels from "../constants/TextFieldsTipDetails";
import { DirectionalHint, Label } from "office-ui-fabric-react";
import { Web } from "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/lists";
import "@pnp/sp/items";
export interface IRequestUIFormProps {
  context: WebPartContext;
  userprofileAD: IUserProfile;
  EmpId: string;
  onErrorRequiredFields: () => void;
  onSave: (formData: IServiceRequestFormData) => Promise<void>;
    OcpApimKey: string;
  UserRecIdApilink: string;
}
const isAr =
  window.location.pathname.includes("/ar/") ||
  window.location.search.includes("lang=ar");

const ServiceUIForm: React.FC<IRequestUIFormProps> = (props) => {
  const [formData, setFormData] = useState<IServiceRequestFormData>({
    requestedBy: props.userprofileAD?.displayName,
    requestedFor: "",
    requestedFor_key: "",
    serviceName_key: "",
    serviceName: "",
    officeLocation: null,
    PhoneNumber: "",
    RequesterEmail: props.userprofileAD?.mail,
    files: [],
    description: "",
EntityDepartment_key:"",
    EntityDepartment: "",
    ProjectName: "",
    ProjectManagerEmail: "",
    TransportProtocol: "",
    SourceType: "",
    SourceIP: "",
    SourcePortNumber: "",
    SourceNATPAT: "",
    DestinationSubnet: "",
    DestinationPortNo: "",
    DestinationType: "",
    Directional: "",
    descriptionP: "",
    DurationFrom: null,
    DurationTo: null,
    URLLink: "",
    requestedFor_Title:""
  });
  const rootSiteURL =
    window.location.protocol +
    "//" +
    window.location.hostname +
    "/sites/MCIT-Internal-Services";
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string }>>(
    []
  );
  const [showErrorUpload, setShowErrorUpload] = useState("");
  const [errors, setErrors] = useState<{ [field: string]: string }>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const [firstDayOfWeek, setFirstDayOfWeek] = React.useState(DayOfWeek.Sunday);
  const [departmentOptions, setdepartmentOptions] = useState([]);
  const [selectedPeoplePickerProfiles, setselectedPeoplePickerProfiles] =
    useState<IUserProfile[]>([]);
  const [, setForceUpdater] = useState(0);

  let fileInfo: HTMLInputElement;
  function handleInputChange(field: string, value: any) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function validateForm() {
    const newErrors: { [field: string]: string } = {};
    //if (!formData.requestedBy.trim()) newErrors.requestedBy = isAr ? "مطلوب بواسطة" : "requestedBy is required";
    if (!formData.requestedFor.trim())
      newErrors.requestedFor = isAr
        ? "مطلوب مطلوب"
        : "RequestedFor is required";
    if (!formData.serviceName.trim())
      newErrors.serviceName = isAr
        ? "اسم الخدمة مطلوب"
        : "Service Name is required";
    if (!formData.officeLocation)
      newErrors.officeLocation = isAr ? "الموقع مطلوب" : "Location is required";
    if (!formData.PhoneNumber)
      newErrors.PhoneNumber = isAr
        ? "رقم الهاتف مطلوب"
        : "Phone Number is required";

    if (formData.serviceName == "Communication Matrix") {
      if (!formData.RequesterEmail)
        newErrors.RequesterEmail = isAr
          ? "مطلوب إدخال البريد الإلكتروني للمتقدم"
          : "Requester Email is required";
      if (!formData.EntityDepartment)
        newErrors.EntityDepartment = isAr
          ? "قسم الكيان مطلوب"
          : "Entity Department is required";

      if (!formData.ProjectName)
        newErrors.ProjectName = isAr
          ? "اسم المشروع مطلوب"
          : "Project Name is required";

      if (!formData.ProjectManagerEmail)
        newErrors.ProjectManagerEmail = isAr
          ? "البريد الإلكتروني لمدير المشروع مطلوب"
          : "Project Manager Email is required";

      if (!formData.TransportProtocol)
        newErrors.TransportProtocol = isAr
          ? "بروتوكول النقل مطلوب"
          : "Transport Protocol is required";

      if (!formData.SourceType)
        newErrors.SourceType = isAr
          ? "نوع المصدر مطلوب"
          : "Source Type is required";

      if (!formData.SourceIP)
        newErrors.SourceIP = isAr
          ? "عنوان IP للمصدر مطلوب"
          : "Source IP is required";

      if (!formData.SourcePortNumber)
        newErrors.SourcePortNumber = isAr
          ? "رقم منفذ المصدر مطلوب"
          : "Source Port Number is required";

      if (!formData.SourceNATPAT)
        newErrors.SourceNATPAT = isAr
          ? "NAT PAT للمصدر مطلوب"
          : "Source NAT PAT is required";

      if (!formData.DestinationSubnet)
        newErrors.DestinationSubnet = isAr
          ? "الشبكة الفرعية للوجهة مطلوبة"
          : "Destination Subnet is required";

      if (!formData.DestinationPortNo)
        newErrors.DestinationPortNo = isAr
          ? "رقم منفذ الوجهة مطلوب"
          : "Destination Port No is required";

      if (!formData.DestinationType)
        newErrors.DestinationType = isAr
          ? "نوع الوجهة مطلوب"
          : "Destination Type is required";

      if (!formData.Directional)
        newErrors.Directional = isAr
          ? "الاتجاه مطلوب"
          : "Directional is required";

      if (!formData.DurationFrom)
        newErrors.DurationFrom = isAr
          ? "تاريخ البداية مطلوب"
          : "Duration From is required";

      if (!formData.DurationTo)
        newErrors.DurationTo = isAr
          ? "تاريخ النهاية مطلوب"
          : "Duration To is required";

      if (!formData.descriptionP)
        newErrors.descriptionP = isAr
          ? "الوصف مطلوب"
          : "Description is required";
    }
    if (
      formData.serviceName == "Block Website" ||
      formData.serviceName == "Unblock Website"
    ) {
      if (!formData.URLLink)
        newErrors.URLLink = isAr ? "رابط URL مطلوب" : "URL Link is required";
    }
    if (!formData.description)
      newErrors.description = isAr ? "الوصف مطلوب" : "Description is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      props.onErrorRequiredFields();
      return false;
    }
    return true;
  }

  async function handleSubmit() {
    //   e.preventDefault();
    setErrors({});
    if (!validateForm()) return;
    await props.onSave(formData);
  }
  const displayName = props.userprofileAD?.displayName;

  let initials = "";
  if (displayName && displayName.trim()) {
    const parts = displayName.split(" ");
    initials = parts[0][0] + parts[parts.length - 1][0];
  } else {
    initials = "";
  }

  const peoplePickerContext: IPeoplePickerContext = {
    absoluteUrl: props.context.pageContext.web.absoluteUrl,
    msGraphClientFactory: props.context.msGraphClientFactory as any,
    spHttpClient: props.context.spHttpClient as any,
  };
  const _getPeoplePickerItems = async (
    selectedUserProfiles: any[],
    internalName: string,
     internalName_Text: string,
     internalName_key: string
  ) => {
    if (selectedUserProfiles.length > 0) {
      const emails = selectedUserProfiles[0].id.split("|")[2];
       const title = selectedUserProfiles[0].text;
      handleInputChange(internalName, emails);
      handleInputChange(internalName_Text, title);
      _getUserRecId(emails, internalName_key);

      console.log("Selected userids:", emails);
      console.log("Selected Items:", selectedUserProfiles);
    } else {
      handleInputChange(internalName, "");
      handleInputChange(internalName_Text, "");
      handleInputChange(internalName_key, "");
    }
  };
   const _getUserRecId = async (email, columnkey) => {
    try {
      console.log("_getUserRecId function is called");
      const response = await fetch(props.UserRecIdApilink, {
        method: "GET",
        headers: {
          "Ocp-Apim-Subscription-Key": props.OcpApimKey,
          Email: email,
        },
      });
      if (response.ok) {
        const rawResponse = await response.text();
        const jsonStart = rawResponse.indexOf("{");
        if (jsonStart === -1) {
          throw new Error("JSON not found in response");
        }

        // Step 2: Extract only the JSON string
        const jsonString = rawResponse.slice(jsonStart);

        // Step 3: Parse the JSON
        let parsedData;
        try {
          parsedData = JSON.parse(jsonString);
          console.log("requestRecId Hardware Request:", parsedData);
        } catch (e) {
          throw new Error("Failed to parse JSON: " + e.message);
        }
        let UserEmail = parsedData.value[0].PrimaryEmail;
        let RecId = parsedData.value[0].RecId;
        handleInputChange(columnkey, RecId);
      }
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed: ${response.status} - ${errorText}`);
      }
    } catch (error: any) {
      console.error("Error getting UserRecId:", error);
    }
  };
  useEffect(() => {
    try {
      const web = Web(rootSiteURL);
      let departarray = [];
      departarray.push({
        key: "",
        text: isAr ? "اختر القسم" : "Select Department",
        disabled: true,
      });
      web.lists
        .getByTitle("MCITDepartments")
        .items.get()
        .then((res) => {
          res.forEach((element) => {
            departarray.push({
              key: element.RecId,
              text: isAr ? element.TitleAr : element.Title,
            });
          });
          setdepartmentOptions(departarray);
          console.log("dep", res);
        })
        .catch((e) => {});
    } catch (error) {}
  }, [props.context]);
  let requesterFileList: FileList | null = null;
  const removeAttachment = (fileName: string) => {
    // Filter out the file to remove
    const updatedFile = uploadedFiles.filter((file) => file.name !== fileName);

    // Update the state with the new list of files
    setUploadedFiles(updatedFile);
    handleInputChange("files", updatedFile);
    // Update the formData to reflect the removal
  };

  const readFile = (e: React.ChangeEvent<HTMLInputElement>, field) => {
    requesterFileList = e.target.files;
    if (requesterFileList) {
      console.log("file details", fileInfo.files[0]);
      const fileExtension = fileInfo.files[0].name.substring(
        fileInfo.files[0].name.lastIndexOf(".") + 1,
        fileInfo.files[0].name.length
      );
      const fileName =
        fileInfo.files[0].name
          .substring(0, fileInfo.files[0].name.lastIndexOf(".") + 1)
          .replace(/[&\/\\#~%":*. [\]!¤+`´^?<>|{}]/g, "") +
        "." +
        fileExtension;

      const newFile = {
        name: fileName,
        content: fileInfo.files[0],
      };

      // Add the new file to the existing state of uploaded files
      setUploadedFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, newFile];
        console.log("uploadedFiles file details", updatedFiles);

        // Update formData using the latest updatedFiles
        setFormData((prev) => ({ ...prev, [field]: updatedFiles }));

        return updatedFiles;
      });
      // Update progress for the newly added file
      let currentProgress = 0;
      const interval = setInterval(() => {
        if (currentProgress >= 100) {
          clearInterval(interval);
        } else {
          currentProgress += 10;
          setUploadedFiles((prevFiles) =>
            prevFiles.map((file) =>
              file.name === newFile.name
                ? { ...file, progress: currentProgress }
                : file
            )
          );
        }
      }, 300);
    }
  };

  const updateFormData = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue: string | undefined,
    column: any
  ) => {
    // newValue is the updated text from the Fluent UI TextField
    const value = newValue ?? "";

    // Update formData
    setFormData((prev) => ({
      ...prev,
      [column]: value,
    }));

    // Remove the field's error if the user typed something valid
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors[column] && value.trim() !== "") {
        delete newErrors[column];
      }
      return newErrors;
    });

    forceUpdate();
  };
 const updateFormDropData = (option: any, column: any, columnKey: any) => {
    setFormData((prev) => ({ ...prev, [columnKey]: option?.key as string }));
    setFormData((prev) => ({ ...prev, [column]: option?.text as string }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors[column] && option.key) {
        delete newErrors[column];
      }
      return newErrors;
    });

    forceUpdate();
  };
  const forceUpdate = () => setForceUpdater((prev) => prev + 1);
  const _getPeoplePickerMemberItems = async (
    selectedUserProfiles: any[],
    Member: string
  ) => {
    if (selectedUserProfiles.length > 0) {
      const emails = selectedUserProfiles[0].id.split("|")[2];
      handleInputChange(Member, emails);
      console.log("Selected userids:", emails);
    } else {
      handleInputChange(Member, "");
    }
  };
  return (
    <div>
      <div className="maincontainer">
        <div className="header-top">
          <div className="person-image">{initials}</div>
          <div>
            <div className="person-name">
              {props.userprofileAD?.displayName}
            </div>
            <div className="person-description">
              {props.userprofileAD?.jobTitle} | ID:{" "}
              {props.EmpId ? props.EmpId : "N/A"}
            </div>
          </div>
        </div>
        <div className="textContainer">
          <h2 className="form-heading">
            {isAr ? "يرجى ملء النموذج أدناه" : "Please fill up the form below"}
          </h2>

          <div className="fieldContainer">
            {/* Requested By */}
            <TextField
              type="text"
              label={isAr ? "تم الطلب بواسطة" : "Requested By"}
              className="form-text"
              readOnly
              value={props.userprofileAD?.displayName}
            />
            <div
              className={`people-picker-wrapper ${
                errors.requestedFor ? "error-border" : ""
              }`}
            >
              <PeoplePicker
                context={peoplePickerContext}
                titleText={isAr ? "مطلوب ل *" : "Requested for *"}
                personSelectionLimit={1}
                groupName={""}
                defaultSelectedUsers={[formData.requestedFor]}
                showtooltip={true}
                disabled={false}
                searchTextLimit={3}
                onChange={(e) => {
                  _getPeoplePickerItems(e, "requestedFor","requestedFor_Title","requestedFor_key");
                }}
                principalTypes={[PrincipalType.User]}
                resolveDelay={1000}
              />
            </div>

            <TextField
              label={isAr ? "موقع *" : "Location *"}
              value={formData.officeLocation}
              onChange={(ev, newValue) =>
                updateFormData(ev, newValue, "officeLocation")
              }
              className={`form-text  ${
                errors.officeLocation ? "error-field" : ""
              }`}
            />

            <TextField
              label={isAr ? "رقم التليفون *" : "Phone Number *"}
              value={formData.PhoneNumber}
              className={`form-text  ${
                errors.PhoneNumber ? "error-field" : ""
              }`}
              onChange={(ev, newValue) => {
                // Allow empty string or digits only
                if (newValue === "" || /^\d+$/.test(newValue)) {
                  updateFormData(ev, newValue, "PhoneNumber");
                }
              }}
              inputMode="numeric"
            />

            <Dropdown
              label={isAr ? "اسم الخدمة *" : "Service Name *"}
              selectedKey={formData.serviceName_key}
              className={`dropdownfield ${
                !formData.serviceName ? "placeholder-gray" : ""
              } ${errors.serviceName ? "error-field" : ""}`}
              styles={{
                dropdown: {
                  borderColor: errors.serviceName ? "red" : undefined,
                },
              }}
              onChange={(_, option) => {
                updateFormDropData(option, "serviceName","serviceName_key");
              }}
              options={[
                {
                  key: "",
                  text: isAr ? "حدد اسم الخدمة..." : "Select Service Name...",
                  disabled: true,
                },
                {
                  key: "8003DFF547664833872469EFA967B606",
                  text: isAr ? "مصفوفة الاتصالات" : "Communication Matrix",
                },
                {
                  key: "6605D472FDE746659607B980DFD700E0",
                  text: isAr ? "حظر موقع الويب" : "Block Website",
                },
                {
                  key: "62AB7A5E8F8542AF9B1673642DC77BF6",
                  text: isAr ? "إلغاء حظر موقع الويب" : "Unblock Website",
                },
                {
                  key: "B7A1667AAD094D3CAFFFDC12EFAB8B67",
                  text: isAr ? "أخرى" : "Others",
                },
              ]}
            />
            <TextField
              label={isAr ? "البريد الإلكتروني للمتقدم *" : "Requester Email *"}
              value={formData.RequesterEmail}
              // className={`form-text`}
              className={`form-text  ${
                errors.RequesterEmail ? "error-field" : ""
              }`}
              readOnly
              // onChange={(ev, newValue) => {
              //   updateFormData(ev, newValue, "RequesterEmail");
              // }}
            />

            {formData.serviceName == "Communication Matrix" && (
              <>
                <div className="project-details">
                  <label>Project Details</label>
                </div>
                <div className="project-details">
                  <label> </label>
                </div>
                <Dropdown
                  id="departmentsdropdown"
                  label={isAr ? "الكيان/القسم *" : "Entity/ Department *"}
                  selectedKey={formData.EntityDepartment_key}
                  onChange={(_, option) =>
                    updateFormDropData(
                      option,
                      "EntityDepartment", "EntityDepartment_key"
                    )
                  }
                  className={`dropdownfield ${
                    !formData.EntityDepartment ? "placeholder-gray" : ""
                  } ${errors.EntityDepartment ? "error-field" : ""}`}
                  styles={{
                    dropdown: {
                      borderColor: errors.EntityDepartment ? "red" : undefined,
                    },
                  }}
                  options={departmentOptions}
                />

                <TextField
                  label={isAr ? "اسم المشروع *" : "Project Name *"}
                  value={formData.ProjectName}
                  className={`form-text  ${
                    errors.ProjectName ? "error-field" : ""
                  }`}
                  onChange={(ev, newValue) => {
                    updateFormData(ev, newValue, "ProjectName");
                  }}
                />
                <TextField
                  label={
                    isAr
                      ? "البريد الإلكتروني لمدير المشروع *"
                      : "Project Manager Email Contact *"
                  }
                  value={formData.ProjectManagerEmail}
                  className={`form-text ${
                    errors.ProjectManagerEmail ? "error-field" : ""
                  }`}
                  onChange={(ev, newValue) => {
                    updateFormData(ev, newValue, "ProjectManagerEmail");
                  }}
                  onBlur={() => {
                    const email = formData.ProjectManagerEmail;
                    if (!email) {
                      setErrors((prev) => ({
                        ...prev,
                        ProjectManagerEmail: isAr
                          ? "هذا الحقل مطلوب"
                          : "This field is required",
                      }));
                    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                      setErrors((prev) => ({
                        ...prev,
                        ProjectManagerEmail: isAr
                          ? "صيغة البريد الإلكتروني غير صحيحة"
                          : "Invalid email format",
                      }));
                    } else {
                      setErrors((prev) => ({
                        ...prev,
                        ProjectManagerEmail: "",
                      }));
                    }
                  }}
                  // error={!!errors.ProjectManagerEmail}
                />
                <div className="project-details">
                  <label> </label>
                </div>
                <div className="project-details">
                  <label>Request Details</label>
                </div>
                <div className="project-details">
                  <label> </label>
                </div>
                <TextField
                  onRenderLabel={(props) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "end",
                        fontWeight: 600,
                        marginBottom: 4,
                      }}
                    >
                      <span>
                        {" "}
                        {isAr ? "بروتوكول النقل *" : "Transport Protocol *"}
                      </span>
                      <TooltipHost
                        content={TextfieldTipLabels.SourceType}
                        directionalHint={DirectionalHint.bottomCenter}
                        hostClassName="detailtolltip_popup"
                      >
                        <Icon
                          className="details_icon"
                          iconName="Info"
                          styles={{
                            root: {
                              fontSize: 14,
                              color: "#0078D4",
                              cursor: "pointer",
                              marginLeft: 6,
                              alignItems: "end",
                              marginTop: 1,
                            },
                          }}
                        />
                      </TooltipHost>
                    </div>
                  )}
                  value={formData.TransportProtocol}
                  className={`form-text project_fields ${
                    errors.TransportProtocol ? "error-field" : ""
                  }`}
                  onChange={(ev, newValue) => {
                    updateFormData(ev, newValue, "TransportProtocol");
                  }}
                />

                <TextField
                  // label={isAr ? "نوع المصدر *" : "Source Type *"}
                  onRenderLabel={(props) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "end",
                        fontWeight: 600,
                        marginBottom: 4,
                      }}
                    >
                      <span>{isAr ? "نوع المصدر *" : "Source Type *"}</span>
                      <TooltipHost
                        content={TextfieldTipLabels.SourceType}
                        directionalHint={DirectionalHint.bottomCenter}
                        hostClassName="detailtolltip_popup"
                      >
                        <Icon
                          className="details_icon"
                          iconName="Info"
                          styles={{
                            root: {
                              fontSize: 14,
                              color: "#0078D4",
                              cursor: "pointer",
                              marginLeft: 6,
                              alignItems: "end",
                              marginTop: 1,
                            },
                          }}
                        />
                      </TooltipHost>
                    </div>
                  )}
                  value={formData.SourceType}
                  className={`form-text project_fields ${
                    errors.SourceType ? "error-field" : ""
                  }`}
                  onChange={(ev, newValue) => {
                    updateFormData(ev, newValue, "SourceType");
                  }}
                />
                <TextField
                  onRenderLabel={(props) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "end",
                        fontWeight: 600,
                        marginBottom: 4,
                      }}
                    >
                      <span>
                        {isAr
                          ? "عنوان IP الفرعي المصدر/عنوان IP *"
                          : "Source IP Subnet/ IP Address *"}
                      </span>
                      <TooltipHost
                        directionalHint={DirectionalHint.bottomCenter}
                        hostClassName="detailtolltip_popup"
                        content={TextfieldTipLabels.SourceIP}
                      >
                        <Icon
                          className="details_icon"
                          iconName="Info"
                          styles={{
                            root: {
                              fontSize: 14,
                              color: "#0078D4",
                              cursor: "pointer",
                              marginLeft: 6,
                              alignItems: "end",
                              marginTop: 1,
                            },
                          }}
                        />
                      </TooltipHost>
                    </div>
                  )}
                  value={formData.SourceIP}
                  className={`form-text project_fields ${
                    errors.SourceIP ? "error-field" : ""
                  }`}
                  onChange={(ev, newValue) => {
                    updateFormData(ev, newValue, "SourceIP");
                  }}
                />
                <TextField
                  onRenderLabel={(props) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "end",
                        fontWeight: 600,
                        marginBottom: 4,
                      }}
                    >
                      <span>
                        {isAr ? "رقم منفذ المصدر *" : "Source Port Number *"}
                      </span>
                      <TooltipHost
                        content={TextfieldTipLabels.SourcePortNumber}
                        directionalHint={DirectionalHint.bottomCenter}
                        hostClassName="detailtolltip_popup"
                      >
                        <Icon
                          className="details_icon"
                          iconName="Info"
                          styles={{
                            root: {
                              fontSize: 14,
                              color: "#0078D4",
                              cursor: "pointer",
                              marginLeft: 6,
                              alignItems: "end",
                              marginTop: 1,
                            },
                          }}
                        />
                      </TooltipHost>
                    </div>
                  )}
                  // label={isAr ? "رقم منفذ المصدر *" : "Source Port Number *"}
                  value={formData.SourcePortNumber}
                  className={`form-text  ${
                    errors.SourcePortNumber ? "error-field" : ""
                  }`}
                  onChange={(ev, newValue) => {
                    updateFormData(ev, newValue, "SourcePortNumber");
                  }}
                />
                <TextField
                  onRenderLabel={(props) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "end",
                        fontWeight: 600,
                        marginBottom: 4,
                      }}
                    >
                      <span>
                        {isAr
                          ? "هل المصدر هو عنوان NAT/PAT؟ *"
                          : "Is Source a NAT/PAT Address? *"}
                      </span>
                      <TooltipHost
                        content={TextfieldTipLabels.SourceNATPAT}
                        directionalHint={DirectionalHint.bottomCenter}
                        hostClassName="detailtolltip_popup"
                      >
                        <Icon
                          className="details_icon"
                          iconName="Info"
                          styles={{
                            root: {
                              fontSize: 14,
                              color: "#0078D4",
                              cursor: "pointer",
                              marginLeft: 6,
                              alignItems: "end",
                              marginTop: 1,
                            },
                          }}
                        />
                      </TooltipHost>
                    </div>
                  )}
                  // label={
                  //   isAr
                  //     ? "هل المصدر هو عنوان NAT/PAT؟ *"
                  //     : "Is Source a NAT/PAT Address? *"
                  // }
                  value={formData.SourceNATPAT}
                  className={`form-text  ${
                    errors.SourceNATPAT ? "error-field" : ""
                  }`}
                  onChange={(ev, newValue) => {
                    updateFormData(ev, newValue, "SourceNATPAT");
                  }}
                />
                <TextField
                  onRenderLabel={(props) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "end",
                        fontWeight: 600,
                        marginBottom: 4,
                      }}
                    >
                      <span>
                        {isAr
                          ? "شبكة فرعية الوجهة/ عنوان IP/ أي *"
                          : "Destination Subnet/ IP Address/ Any *"}
                      </span>
                      <TooltipHost
                        content={TextfieldTipLabels.DestinationSubnet}
                        directionalHint={DirectionalHint.bottomCenter}
                        hostClassName="detailtolltip_popup"
                      >
                        <Icon
                          className="details_icon"
                          iconName="Info"
                          styles={{
                            root: {
                              fontSize: 14,
                              color: "#0078D4",
                              cursor: "pointer",
                              marginLeft: 6,
                              alignItems: "end",
                              marginTop: 1,
                            },
                          }}
                        />
                      </TooltipHost>
                    </div>
                  )}
                  // label={
                  //   isAr
                  //     ? "شبكة فرعية الوجهة/ عنوان IP/ أي *"
                  //     : "Destination Subnet/ IP Address/ Any *"
                  // }
                  value={formData.DestinationSubnet}
                  className={`form-text  ${
                    errors.DestinationSubnet ? "error-field" : ""
                  }`}
                  onChange={(ev, newValue) => {
                    updateFormData(ev, newValue, "DestinationSubnet");
                  }}
                />
                <TextField
                  onRenderLabel={(props) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "end",
                        fontWeight: 600,
                        marginBottom: 4,
                      }}
                    >
                      <span>
                        {isAr
                          ? "رقم منفذ الوجهة *"
                          : "Destination Port Number *"}
                      </span>
                      <TooltipHost
                        content={TextfieldTipLabels.DestinationPortNo}
                        directionalHint={DirectionalHint.bottomCenter}
                        hostClassName="detailtolltip_popup"
                      >
                        <Icon
                          className="details_icon"
                          iconName="Info"
                          styles={{
                            root: {
                              fontSize: 14,
                              color: "#0078D4",
                              cursor: "pointer",
                              marginLeft: 6,
                              alignItems: "end",
                              marginTop: 1,
                            },
                          }}
                        />
                      </TooltipHost>
                    </div>
                  )}
                  // label={
                  //   isAr ? "رقم منفذ الوجهة *" : "Destination Port Number *"
                  // }
                  value={formData.DestinationPortNo}
                  className={`form-text  ${
                    errors.DestinationPortNo ? "error-field" : ""
                  }`}
                  onChange={(ev, newValue) => {
                    updateFormData(ev, newValue, "DestinationPortNo");
                  }}
                />
                <TextField
                  onRenderLabel={(props) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "end",
                        fontWeight: 600,
                        marginBottom: 4,
                      }}
                    >
                      <span>
                        {isAr ? "نوع الوجهة *" : "Destination Type *"}
                      </span>
                      <TooltipHost
                        content={TextfieldTipLabels.DestinationType}
                        directionalHint={DirectionalHint.bottomCenter}
                        hostClassName="detailtolltip_popup"
                      >
                        <Icon
                          className="details_icon"
                          iconName="Info"
                          styles={{
                            root: {
                              fontSize: 14,
                              color: "#0078D4",
                              cursor: "pointer",
                              marginLeft: 6,
                              alignItems: "end",
                              marginTop: 1,
                            },
                          }}
                        />
                      </TooltipHost>
                    </div>
                  )}
                  // label={isAr ? "نوع الوجهة *" : "Destination Type *"}
                  value={formData.DestinationType}
                  className={`form-text  ${
                    errors.DestinationType ? "error-field" : ""
                  }`}
                  onChange={(ev, newValue) => {
                    updateFormData(ev, newValue, "DestinationType");
                  }}
                />
                <TextField
                  onRenderLabel={(props) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "end",
                        fontWeight: 600,
                        marginBottom: 4,
                      }}
                    >
                      <span>
                        {isAr ? "ثنائي الاتجاه؟ *" : "Bi-Directional? *"}
                      </span>
                      <TooltipHost
                        content={TextfieldTipLabels.Directional}
                        directionalHint={DirectionalHint.bottomCenter}
                        hostClassName="detailtolltip_popup"
                      >
                        <Icon
                          className="details_icon"
                          iconName="Info"
                          styles={{
                            root: {
                              fontSize: 14,
                              color: "#0078D4",
                              cursor: "pointer",
                              marginLeft: 6,
                              alignItems: "end",
                              marginTop: 1,
                            },
                          }}
                        />
                      </TooltipHost>
                    </div>
                  )}
                  // label={isAr ? "ثنائي الاتجاه؟ *" : "Bi-Directional? *"}
                  value={formData.Directional}
                  className={`form-text  ${
                    errors.Directional ? "error-field" : ""
                  }`}
                  onChange={(ev, newValue) => {
                    updateFormData(ev, newValue, "Directional");
                  }}
                />
                {/* <DatePicker
                  label={isAr ? "المدة من *" : "Duration From *"}
                  firstDayOfWeek={firstDayOfWeek}
                  placeholder="Select a date..."
                  ariaLabel="Select a date"
                  onSelectDate={(e): void => {
                    handleInputChange("DurationFrom", e);
                  }}
                  className={`form-text ${
                    errors.DurationFrom ? "has-error" : "no-error"
                  }`}
                  // DatePicker uses English strings by default. For localized apps, you must override this prop.
                  strings={defaultDatePickerStrings}
                />
                <DatePicker
                  label={isAr ? "المدة إلى *" : "Duration To *"}
                  firstDayOfWeek={firstDayOfWeek}
                  placeholder="Select a date..."
                  ariaLabel="Select a date"
                  onSelectDate={(e): void => {
                    handleInputChange("DurationTo", e);
                  }}
                  className={`form-text ${
                    errors.DurationTo ? "has-error" : "no-error"
                  }`}
                  // DatePicker uses English strings by default. For localized apps, you must override this prop.
                  strings={defaultDatePickerStrings}
                /> */}
              </>
            )}
            {(formData.serviceName == "Block Website" ||
              formData.serviceName == "Unblock Website") && (
              <>
                <TextField
                  label={isAr ? "رابط URL *" : "URL Link *"}
                  value={formData.URLLink}
                  className={`form-text  ${
                    errors.URLLink ? "error-field" : ""
                  }`}
                  onChange={(ev, newValue) => {
                    updateFormData(ev, newValue, "URLLink");
                  }}
                />
              </>
            )}
          </div>
          {formData.serviceName == "Communication Matrix" && (
            <>
              <div className="description_div">
                <TextField
                  onRenderLabel={(props) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "end",
                        fontWeight: 600,
                        marginBottom: 4,
                      }}
                    >
                      <span>
                        {isAr ? "وصف المشروع *" : "Project Description *"}
                      </span>
                      <TooltipHost
                        content={TextfieldTipLabels.descriptionP}
                        directionalHint={DirectionalHint.bottomCenter}
                        hostClassName="detailtolltip_popup"
                      >
                        <Icon
                          className="details_icon"
                          iconName="Info"
                          styles={{
                            root: {
                              fontSize: 14,
                              color: "#0078D4",
                              cursor: "pointer",
                              marginLeft: 6,
                              alignItems: "end",
                              marginTop: 1,
                            },
                          }}
                        />
                      </TooltipHost>
                    </div>
                  )}
                  // label={isAr ? "وصف *" : "Description *"}
                  value={formData.descriptionP}
                  multiline
                  rows={4}
                  type="text-area"
                  className={`text-area ${
                    errors.descriptionP ? "error-field" : ""
                  }`}
                  onChange={(ev, newValue) =>
                    updateFormData(ev, newValue, "descriptionP")
                  }
                  styles={{
                    root: { color: "#555" },
                    fieldGroup: { border: "1px solid #ccc" },
                    field: { color: "#555" },
                  }}
                />
              </div>
            </>
          )}
          <div
            className="description_div"
            style={{
              marginTop: "25px",
            }}
          >
            <TextField
              label={isAr ? "وصف *" : "Description *"}
              value={formData.description}
              multiline
              rows={4}
              type="text-area"
              className={`text-area ${errors.description ? "error-field" : ""}`}
              onChange={(ev, newValue) =>
                updateFormData(ev, newValue, "description")
              }
              styles={{
                root: { color: "#555" },
                fieldGroup: { border: "1px solid #ccc" },
                field: { color: "#555" },
              }}
            />
          </div>
          <Col className="mt-4">
            <div style={{ display: "flex", alignItems: "end" }}>
              <label
                style={{
                  marginRight: "4px",
                  marginTop: "24px",
                  fontSize: "12px",
                  fontFamily: "Segoe UI",
                  color: "#555555",
                  fontWeight: "500",
                  marginBottom: "11.5px",
                }}
              >
                {isAr
                  ? "أي مستندات أو صور تساعد في إثبات القضية:"
                  : "Any documents or pictures (optional):"}
              </label>
            </div>

            <div className="attachment-container">
              <div className="attachment-placeholder">
                <img
                  className="attachment-icon"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKoSURBVHgB7ZnbjdpAFIaPDYLX7WDdQUBcJJ4CFWRTQUgHbAVABbAVQCpIOljyhIS4leAO4rwB4pL/sMcbxxdij8dWFO0vjcY7c8Z8mjOeOXPWoAgtFotKsVgc4bGCckfpZO/3+06r1bIpoYywxuVy+WCa5kTAHJSfpK57qZUgA4Cbzca6XC7PeOT6CaCDarXqkKLW67WdBtL0N5zP567ATWu1Wi8NnE9bfm+5XH7GJMReMgFAwzDeXztM8wtpFN7bIYFkD8WFNKM6drudTRrFnhBIG6USF9KkHBUC+fVvY3IFZAHS9kC2V6vV5JZ9boDz+dxyn72QqLu3IDMHhBu/cV0qlfre9hDIUdj4ImUs7AZjQH5gCOyJbXpx7VVof7VDfw+QDra24R/jKWN5Zuo7ioXS9hWLfkN2/eMzn0EWQzKMbCuVMBs5vQLSCggX9VDdw02PYf1yKs3C+uD+sGZ9LgZcHy4ayVqakCZpARS4gfu3fJV90qDUgD44N7DgE2OgAzIVIOLGTy4cFvlnkrjxeDx2dEEqA0pQOxW4R3wYU7ev2WxuT6fTR34WyB4pSgmQrwMScTPcEHBjv02j0ZjJrDLkiGebFKQEWCgUHlDdCdwgyo5nlWeXXiCrpCAlQIbiH7wF57Ed80nCVwdSkPJGjU13m8B2RorKPR5MqjfAtPrnAXWHWz9QLqRRWgElMNUqrYAasxCv+r/WoBz67yiFcPRt6/X6U1z7RIBYY3zgVyiF8A4bVWaAHEJZlE6xj0hWIkC5ndmUo8I+kmtUjPSvRTkJ11F32QR2gQAgFvGMa8R8Wi49cYTf7EkdcH8AUMJ4myTzxNEzZSROKElOhj8+53A4DP02oUl0b56a8pHDFy2+y/g7jKgRAjkgPf+GiBRnvzBz46jE+i8JiDR7F2tlUAAAAABJRU5ErkJggg=="
                  alt="Attachment Icon"
                />
                {isAr
                  ? "إرفاق الملف بتنسيق PNG أو JPG أو PDF (اختياري)"
                  : "Attach file in PNG, JPG, or PDF format (optional)"}
                <input
                  type="file"
                  // ref={inputRef}
                  multiple={true}
                  ref={(element) => {
                    fileInfo = element;
                  }}
                  onChange={(e) => {
                    readFile(e, "files");
                  }}
                />
              </div>
              <span style={{ color: "red" }}>
                {errors.files || showErrorUpload}
              </span>
            </div>

            {uploadedFiles.map((file, index) => (
              <div key={index}>
                <div className="uploadeditems">
                  <strong>{file.name}</strong>
                  <div className="progresscontainer">
                    <div
                      className="progressbar"
                      id="progressbar"
                      style={{ width: `${file["progress"]}%` }} // Each file has its own progress
                    ></div>
                  </div>
                  <div
                    className="cancelbtn"
                    onClick={() => {
                      removeAttachment(file.name); // Pass the file name to remove it
                    }}
                  >
                    X
                  </div>
                </div>
              </div>
            ))}
            {/* <p style={{ color: "gray" }}>
                  {!isAr
                    ? "# You can upload up to 10 documents or images."
                    : "يمكنك تحميل ما يصل إلى 10 مستندات أو صور."}
                </p> */}
          </Col>
          <div className="buttonContainer">
            <PrimaryButton
              onClick={() => {
                handleSubmit();
              }}
              styles={{ root: { fontSize: "20px" } }}
              text={!isAr ? "Submit" : "يُقدِّم"}
              className="submit-formbtn"
            />
            <DefaultButton
              text={!isAr ? "Cancel" : "يلغي"}
              className="cancel-formbtn"
              onClick={() => {
                setFormData({
                  requestedFor: "",
                  requestedFor_key: "",
                  requestedFor_Title:"",
                  serviceName_key: "",
                  serviceName: "",
                  officeLocation: "",
                  PhoneNumber: "",
                  RequesterEmail: "",
                  description: "",
                  files: [],
                  EntityDepartment_key:"",

                  EntityDepartment: "",
                  ProjectName: "",
                  ProjectManagerEmail: "",
                  TransportProtocol: "",
                  SourceType: "",
                  SourceIP: "",
                  SourcePortNumber: "",
                  SourceNATPAT: "",
                  DestinationSubnet: "",
                  DestinationPortNo: "",
                  DestinationType: "",
                  Directional: "",
                  descriptionP: "",
                  DurationFrom: null,
                  DurationTo: null,
                  URLLink: "",
                });
                setUploadedFiles([]);
                setShowErrorUpload("");
                setErrors({});
                if (inputRef.current) inputRef.current.value = "";
                fileInfo = null;
              }}
            />
          </div>
        </div>
      </div>
      <div className="testelement"></div>
    </div>
  );
};

export default ServiceUIForm;
