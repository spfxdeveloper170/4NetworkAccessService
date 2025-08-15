import * as React from "react";
import { useEffect, useState } from "react";
import { MSGraphClient } from "@microsoft/sp-http";
import styles from "./Service.module.scss";
import type { IServiceProps, IServiceRequestFormData } from "./IServiceProps";
import { escape } from "@microsoft/sp-lodash-subset";
import AlertModal from "../../../components/alertModal/AlertModal";
import { Web } from "@pnp/sp/webs";
import ServiceUIForm from "../../../components/ServiceUIForm";
interface IUserProfile {
  displayName: string;
  jobTitle: string;
  department: string;
  employeeId: string;
  mail: string;
}
//const rootSiteURL = window.location.protocol + "//" + window.location.hostname + "/sites/MCIT-Internal-Services";
const getUserInitials = (displayName: string): string => {
  const names = displayName.trim().split(" ");
  const initials = names.map((name) => name.charAt(0).toUpperCase()).join("");
  return initials;
};
const generateGUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
const generateUserTitle = async (
  userProfileAD: IUserProfile | null
): Promise<string> => {
  if (!userProfileAD || !userProfileAD.displayName) {
    throw new Error("User profile information is missing.");
  }
  const userInitials = getUserInitials(userProfileAD.displayName);
  const guid = generateGUID().substring(0, 8);
  const title = `MR-${userInitials}-${guid}`;
  console.log("Generated User Title:", title);
  return title;
};
const ServiceRequest: React.FC<IServiceProps> = (props) => {
  const [userProfileAD, setUserProfileAD] = useState<IUserProfile | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);
  const [modalHeading, setModalHeading] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [alertsection, setAlertsection] = useState("");
  const [iconLoad, setIconLoad] = useState("");
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = (section: string) => {
    setShowModal(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const client: MSGraphClient =
          await props.context.msGraphClientFactory.getClient("3");
        const userAD: any = await client
          .api("/me")
          .select(
            "displayName,jobTitle,department,employeeId,mail,onPremisesExtensionAttributes"
          )
          .get();

        const userProfile: IUserProfile = {
          displayName: userAD.displayName || "",
          jobTitle: userAD.jobTitle || "",
          department: userAD.department || "",
          employeeId:
            userAD?.onPremisesExtensionAttributes?.extensionAttribute15 || "",
          mail: userAD?.mail || "",
        };

        setUserProfileAD(userProfile);
        setIsLoadingUser(false);
      } catch (error) {
        console.error("Error fetching user info:", error);
        setIsLoadingUser(false);
      }
    })();
  }, [props]);

  const showErrorModal = () => {
    setModalHeading("Warning");
    setModalMessage("Please fill Required fields");
    setAlertsection("rejected");
    setIconLoad("WarningSolid");
    handleShowModal();
  };

  const saveRequest = async (formData: IServiceRequestFormData) => {
    try {
      console.log(formData);
      const payload = {
        attachmentsToDelete: [],
        attachmentsToUpload: [],
        parameters: {
           "par-B13AED3FD9E44CB3AD1C70E1095B0536":formData.requestedBy,
          "par-BE168216A8BF44F18DD58FFEE01D9745":formData.requestedFor_Title,
          "par-BE168216A8BF44F18DD58FFEE01D9745-recId":formData.requestedFor_key,
          "par-237CAD7F5BB74D1C9BDCA93A92C13178": formData.serviceName,
          "par-237CAD7F5BB74D1C9BDCA93A92C13178-recId": formData.serviceName_key,
          "par-A112BF0DBEB242B58B4D3C918B138A07": formData.officeLocation,
          "par-48FD18F6555A4D9EA93AAFDAE8977BF1": formData.PhoneNumber,
          "par-6B8B00D1A23C4D5CAD7F05C5B7B5FA4F": formData.URLLink,
          "par-30ECCB839A194A75A699DE9F5098FF6A": formData.RequesterEmail,
          "par-A5D7D330A224454EA24AD7067BE2D743": formData.TransportProtocol,

          "par-530FCC64B03F44129349A822F6AB2DDF":formData.SourceType,
          "par-5B6542B5C5F5433DAF3410B84E4A46D0":formData.SourceIP,
          "par-607FA3440B194719A04306C8739AECFA":formData.SourcePortNumber,
          "par-F325211B310C4B938EE4BDA8931FE676":formData.SourceNATPAT,
          "par-09CD060F4F404E1AA21396E33245897F":formData.DestinationSubnet,
          "par-7E40CE088D86469D86D4E73D3EA6B00A":formData.DestinationPortNo,
          "par-A4DAEDBC8C124061A35E80E84CE6F87E":formData.DestinationType,
          "par-572AB494B7394A40A8EA5972128BB18F":formData.Directional,
          "par-A0C75C04AA75431BA0489415658231E5":formData.descriptionP,

          
          "par-AEEE85B79B234B9DA3A5E37603FBA69A": formData.EntityDepartment,
          "par-AEEE85B79B234B9DA3A5E37603FBA69A-recId": formData.EntityDepartment_key,
          "par-3D36F047481D4DB5AEE6F20824499C2D": formData.ProjectName,
          "par-E82CDDFE00D84382A2BF7102EC3FD0E4": formData.ProjectManagerEmail,

          "par-07CB7EAAEC6B4235970E1DEB1D4FAB58": formData.description,
        },
        delayedFulfill: false,
        formName: "ServiceReq.ResponsiveAnalyst.DefaultLayout",
        saveReqState: false,
        serviceReqData: {
          Subject: `${props.Subject}`,
          Symptom: formData.description, // "It allows employees to make Mobile and International calls with standards features like Voicemail and Call Forwarding",
          Category: props.Category,// "Calling",
          CreatedBy:formData.requestedBy,// "Ashish",
         // Subcategory: "Access",
        },
        subscriptionId: props.subscriptionId,
      };
      const response = await fetch(`${props.Apilink}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": `${props.OcpApimKey}`,
          Email:formData.requestedFor// "pmishra@mcit.gov.qa",
        },
        body: JSON.stringify(payload),
      });
      console.log("response", response);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed: ${response.status} - ${errorText}`);
      }
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
        } catch (e) {
          throw new Error("Failed to parse JSON: " + e.message);
        }

        const requestRecId = parsedData?.ServiceRequests?.[0]?.strRequestRecId;
        const strRequestNum = parsedData?.ServiceRequests?.[0]?.strRequestNum;

        console.log("requestRecId submitted Hardware Request:", requestRecId);
        console.log("strRequestNum submitted Hardware Request:", strRequestNum);
        let flag = true;
        if (formData.files.length > 0) {
          flag = false;
          await saveRequestAttachment(
            requestRecId,
            strRequestNum,
            formData.files
          );
        }

        if (flag) {
          setModalHeading("Success");
          setModalMessage("Your Request has been submitted successfully.");
          setAlertsection("Accepted");
          setIconLoad("SkypeCircleCheck");
          handleShowModal();

          if (props.isredirect) {
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        }
      }
    } catch (error: any) {
      console.error("Error submitting Request:", error);
      setModalHeading("Error");
      setModalMessage(error.message);
      setAlertsection("rejected");
      setIconLoad("ErrorBadge");
      handleShowModal();
    }
  };
const saveRequestAttachment = async (
    recid: string,
    requestnum: string,
    formData: any
  ) => {
    try {
      console.log("Attachment function is called");
      const ApiformData = new FormData();
      ApiformData.append("ObjectID", recid);
      ApiformData.append("ObjectType", "ServiceReq#");
      ApiformData.append("File", formData[0].content);
      const response = await fetch(props.attachmentApilink, {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": props.OcpApimKey, // "ba47658772b3473cbd9eb045e856e9fc",
        },
        body: ApiformData,
      });
      if (response.ok) {
        setModalHeading("Success");
        setModalMessage("Your Request has been submitted successfully.");
        setAlertsection("Accepted");
        setIconLoad("SkypeCircleCheck");
        handleShowModal();

        if (props.isredirect) {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed: ${response.status} - ${errorText}`);
      }
    } catch (error: any) {
      console.error("Error submitting Attachment:", error);
      setModalHeading("Error");
      setModalMessage(error.message);
      setAlertsection("rejected");
      setIconLoad("ErrorBadge");
      handleShowModal();
    }
  };
  if (isLoadingUser) {
    return <div>Loading user information...</div>;
  }
  return (
    <>
      <ServiceUIForm
       OcpApimKey={props.OcpApimKey}
        UserRecIdApilink={props.UserRecIdApilink}
        context={props.context}
        userprofileAD={userProfileAD}
        EmpId={userProfileAD?.employeeId || ""}
        onErrorRequiredFields={() => showErrorModal()}
        onSave={async (formData) => {
          await saveRequest(formData);
        }}
      />

      <AlertModal
        showModal={showModal}
        handleShowModal={handleShowModal}
        handleCloseModal={handleCloseModal}
        heading={modalHeading}
        message={modalMessage}
        style={""}
        section={alertsection}
        icon={iconLoad}
      />
    </>
  );
};

export default ServiceRequest;
