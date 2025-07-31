var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { TextField, PrimaryButton, DefaultButton, Dropdown, DatePicker, DayOfWeek, defaultDatePickerStrings, Icon, TooltipHost, } from "@fluentui/react";
import "../css/style.css";
import { PeoplePicker, PrincipalType, } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { Col } from "react-bootstrap";
import TextfieldTipLabels from "../constants/TextFieldsTipDetails";
import { DirectionalHint } from "office-ui-fabric-react";
import { Web } from "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/lists";
import "@pnp/sp/items";
var isAr = window.location.pathname.includes("/ar/") ||
    window.location.search.includes("lang=ar");
var ServiceUIForm = function (props) {
    var _a, _b, _c, _d, _e, _f;
    var _g = useState({
        requestedBy: (_a = props.userprofileAD) === null || _a === void 0 ? void 0 : _a.displayName,
        requestedFor: "",
        serviceName: "",
        officeLocation: null,
        PhoneNumber: "",
        RequesterEmail: (_b = props.userprofileAD) === null || _b === void 0 ? void 0 : _b.mail,
        files: [],
        description: "",
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
    }), formData = _g[0], setFormData = _g[1];
    var rootSiteURL = window.location.protocol +
        "//" +
        window.location.hostname +
        "/sites/MCIT-Internal-Services";
    var _h = useState([]), uploadedFiles = _h[0], setUploadedFiles = _h[1];
    var _j = useState(""), showErrorUpload = _j[0], setShowErrorUpload = _j[1];
    var _k = useState({}), errors = _k[0], setErrors = _k[1];
    var inputRef = useRef(null);
    var _l = React.useState(DayOfWeek.Sunday), firstDayOfWeek = _l[0], setFirstDayOfWeek = _l[1];
    var _m = useState([]), departmentOptions = _m[0], setdepartmentOptions = _m[1];
    var _o = useState([]), selectedPeoplePickerProfiles = _o[0], setselectedPeoplePickerProfiles = _o[1];
    var _p = useState(0), setForceUpdater = _p[1];
    var fileInfo;
    function handleInputChange(field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    }
    function validateForm() {
        var newErrors = {};
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
        if (formData.serviceName == "Block Website" ||
            formData.serviceName == "Unblock Website") {
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
    function handleSubmit() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //   e.preventDefault();
                        setErrors({});
                        if (!validateForm())
                            return [2 /*return*/];
                        return [4 /*yield*/, props.onSave(formData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var displayName = (_c = props.userprofileAD) === null || _c === void 0 ? void 0 : _c.displayName;
    var initials = "";
    if (displayName && displayName.trim()) {
        var parts = displayName.split(" ");
        initials = parts[0][0] + parts[parts.length - 1][0];
    }
    else {
        initials = "";
    }
    var peoplePickerContext = {
        absoluteUrl: props.context.pageContext.web.absoluteUrl,
        msGraphClientFactory: props.context.msGraphClientFactory,
        spHttpClient: props.context.spHttpClient,
    };
    var _getPeoplePickerItems = function (selectedUserProfiles, internalName) { return __awaiter(void 0, void 0, void 0, function () {
        var emails;
        return __generator(this, function (_a) {
            if (selectedUserProfiles.length > 0) {
                emails = selectedUserProfiles[0].id.split("|")[2];
                handleInputChange(internalName, emails);
                console.log("Selected userids:", emails);
                console.log("Selected Items:", selectedUserProfiles);
            }
            else {
                handleInputChange(internalName, "");
            }
            return [2 /*return*/];
        });
    }); };
    useEffect(function () {
        try {
            var web = Web(rootSiteURL);
            var departarray_1 = [];
            departarray_1.push({
                key: "",
                text: isAr ? "اختر القسم" : "Select Department",
                disabled: true,
            });
            web.lists
                .getByTitle("MCITDepartments")
                .items.get()
                .then(function (res) {
                res.forEach(function (element) {
                    departarray_1.push({
                        key: element.Title,
                        text: isAr ? element.TitleAr : element.Title,
                    });
                });
                setdepartmentOptions(departarray_1);
                console.log("dep", res);
            })
                .catch(function (e) { });
        }
        catch (error) { }
    }, [props.context]);
    var requesterFileList = null;
    var removeAttachment = function (fileName) {
        // Filter out the file to remove
        var updatedFile = uploadedFiles.filter(function (file) { return file.name !== fileName; });
        // Update the state with the new list of files
        setUploadedFiles(updatedFile);
        handleInputChange("files", updatedFile);
        // Update the formData to reflect the removal
    };
    var readFile = function (e, field) {
        requesterFileList = e.target.files;
        if (requesterFileList) {
            console.log("file details", fileInfo.files[0]);
            var fileExtension = fileInfo.files[0].name.substring(fileInfo.files[0].name.lastIndexOf(".") + 1, fileInfo.files[0].name.length);
            var fileName = fileInfo.files[0].name
                .substring(0, fileInfo.files[0].name.lastIndexOf(".") + 1)
                .replace(/[&\/\\#~%":*. [\]!¤+`´^?<>|{}]/g, "") +
                "." +
                fileExtension;
            var newFile_1 = {
                name: fileName,
                content: fileInfo.files[0],
            };
            // Add the new file to the existing state of uploaded files
            setUploadedFiles(function (prevFiles) {
                var updatedFiles = __spreadArray(__spreadArray([], prevFiles, true), [newFile_1], false);
                console.log("uploadedFiles file details", updatedFiles);
                // Update formData using the latest updatedFiles
                setFormData(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[field] = updatedFiles, _a)));
                });
                return updatedFiles;
            });
            // Update progress for the newly added file
            var currentProgress_1 = 0;
            var interval_1 = setInterval(function () {
                if (currentProgress_1 >= 100) {
                    clearInterval(interval_1);
                }
                else {
                    currentProgress_1 += 10;
                    setUploadedFiles(function (prevFiles) {
                        return prevFiles.map(function (file) {
                            return file.name === newFile_1.name
                                ? __assign(__assign({}, file), { progress: currentProgress_1 }) : file;
                        });
                    });
                }
            }, 300);
        }
    };
    var updateFormData = function (event, newValue, column) {
        // newValue is the updated text from the Fluent UI TextField
        var value = newValue !== null && newValue !== void 0 ? newValue : "";
        // Update formData
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[column] = value, _a)));
        });
        // Remove the field's error if the user typed something valid
        setErrors(function (prevErrors) {
            var newErrors = __assign({}, prevErrors);
            if (newErrors[column] && value.trim() !== "") {
                delete newErrors[column];
            }
            return newErrors;
        });
        forceUpdate();
    };
    var updateFormDropData = function (option, column) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[column] = option, _a)));
        });
        setErrors(function (prevErrors) {
            var newErrors = __assign({}, prevErrors);
            if (newErrors[column] && option.key) {
                delete newErrors[column];
            }
            return newErrors;
        });
        forceUpdate();
    };
    var forceUpdate = function () { return setForceUpdater(function (prev) { return prev + 1; }); };
    var _getPeoplePickerMemberItems = function (selectedUserProfiles, Member) { return __awaiter(void 0, void 0, void 0, function () {
        var emails;
        return __generator(this, function (_a) {
            if (selectedUserProfiles.length > 0) {
                emails = selectedUserProfiles[0].id.split("|")[2];
                handleInputChange(Member, emails);
                console.log("Selected userids:", emails);
            }
            else {
                handleInputChange(Member, "");
            }
            return [2 /*return*/];
        });
    }); };
    return (React.createElement("div", null,
        React.createElement("div", { className: "maincontainer" },
            React.createElement("div", { className: "header-top" },
                React.createElement("div", { className: "person-image" }, initials),
                React.createElement("div", null,
                    React.createElement("div", { className: "person-name" }, (_d = props.userprofileAD) === null || _d === void 0 ? void 0 : _d.displayName),
                    React.createElement("div", { className: "person-description" }, (_e = props.userprofileAD) === null || _e === void 0 ? void 0 :
                        _e.jobTitle,
                        " | ID:",
                        " ",
                        props.EmpId ? props.EmpId : "N/A"))),
            React.createElement("div", { className: "textContainer" },
                React.createElement("h2", { className: "form-heading" }, isAr ? "يرجى ملء النموذج أدناه" : "Please fill up the form below"),
                React.createElement("div", { className: "fieldContainer" },
                    React.createElement(TextField, { type: "text", label: isAr ? "تم الطلب بواسطة" : "Requested By", className: "form-text", readOnly: true, value: (_f = props.userprofileAD) === null || _f === void 0 ? void 0 : _f.displayName }),
                    React.createElement("div", { className: "people-picker-wrapper ".concat(errors.requestedFor ? "error-border" : "") },
                        React.createElement(PeoplePicker, { context: peoplePickerContext, titleText: isAr ? "مطلوب ل *" : "Requested for *", personSelectionLimit: 1, groupName: "", defaultSelectedUsers: [formData.requestedFor], showtooltip: true, disabled: false, searchTextLimit: 3, onChange: function (e) {
                                _getPeoplePickerItems(e, "requestedFor");
                            }, principalTypes: [PrincipalType.User], resolveDelay: 1000 })),
                    React.createElement(TextField, { label: isAr ? "موقع *" : "Location *", value: formData.officeLocation, onChange: function (ev, newValue) {
                            return updateFormData(ev, newValue, "officeLocation");
                        }, className: "form-text  ".concat(errors.officeLocation ? "error-field" : "") }),
                    React.createElement(TextField, { label: isAr ? "رقم التليفون *" : "Phone Number *", value: formData.PhoneNumber, className: "form-text  ".concat(errors.PhoneNumber ? "error-field" : ""), onChange: function (ev, newValue) {
                            // Allow empty string or digits only
                            if (newValue === "" || /^\d+$/.test(newValue)) {
                                updateFormData(ev, newValue, "PhoneNumber");
                            }
                        }, inputMode: "numeric" }),
                    React.createElement(Dropdown, { label: isAr ? "اسم الخدمة *" : "Service Name *", selectedKey: formData.serviceName, className: "dropdownfield ".concat(!formData.serviceName ? "placeholder-gray" : "", " ").concat(errors.serviceName ? "error-field" : ""), styles: {
                            dropdown: {
                                borderColor: errors.serviceName ? "red" : undefined,
                            },
                        }, onChange: function (_, option) {
                            updateFormDropData(option === null || option === void 0 ? void 0 : option.key, "serviceName");
                        }, options: [
                            {
                                key: "",
                                text: isAr ? "حدد اسم الخدمة..." : "Select Service Name...",
                                disabled: true,
                            },
                            {
                                key: "Communication Matrix",
                                text: isAr ? "مصفوفة الاتصالات" : "Communication Matrix",
                            },
                            {
                                key: "Block Website",
                                text: isAr ? "حظر موقع الويب" : "Block Website",
                            },
                            {
                                key: "Unblock Website",
                                text: isAr ? "إلغاء حظر موقع الويب" : "Unblock Website",
                            },
                            {
                                key: "Others",
                                text: isAr ? "أخرى" : "Others",
                            },
                        ] }),
                    React.createElement(TextField, { label: isAr ? "البريد الإلكتروني للمتقدم *" : "Requester Email *", value: formData.RequesterEmail, 
                        // className={`form-text`}
                        className: "form-text  ".concat(errors.RequesterEmail ? "error-field" : ""), readOnly: true }),
                    formData.serviceName == "Communication Matrix" && (React.createElement(React.Fragment, null,
                        React.createElement("div", { className: "project-details" },
                            React.createElement("label", null, "Project Details")),
                        React.createElement("div", { className: "project-details" },
                            React.createElement("label", null, " ")),
                        React.createElement(Dropdown, { id: "departmentsdropdown", label: isAr ? "الكيان/القسم *" : "Entity/ Department *", selectedKey: formData.EntityDepartment, onChange: function (_, option) {
                                return updateFormDropData(option === null || option === void 0 ? void 0 : option.key, "EntityDepartment");
                            }, className: "dropdownfield ".concat(!formData.EntityDepartment ? "placeholder-gray" : "", " ").concat(errors.EntityDepartment ? "error-field" : ""), styles: {
                                dropdown: {
                                    borderColor: errors.EntityDepartment ? "red" : undefined,
                                },
                            }, options: departmentOptions }),
                        React.createElement(TextField, { label: isAr ? "اسم المشروع *" : "Project Name *", value: formData.ProjectName, className: "form-text  ".concat(errors.ProjectName ? "error-field" : ""), onChange: function (ev, newValue) {
                                updateFormData(ev, newValue, "ProjectName");
                            } }),
                        React.createElement(TextField, { label: isAr
                                ? "البريد الإلكتروني لمدير المشروع *"
                                : "Project Manager Email Contact *", value: formData.ProjectManagerEmail, className: "form-text ".concat(errors.ProjectManagerEmail ? "error-field" : ""), onChange: function (ev, newValue) {
                                updateFormData(ev, newValue, "ProjectManagerEmail");
                            }, onBlur: function () {
                                var email = formData.ProjectManagerEmail;
                                if (!email) {
                                    setErrors(function (prev) { return (__assign(__assign({}, prev), { ProjectManagerEmail: isAr
                                            ? "هذا الحقل مطلوب"
                                            : "This field is required" })); });
                                }
                                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                                    setErrors(function (prev) { return (__assign(__assign({}, prev), { ProjectManagerEmail: isAr
                                            ? "صيغة البريد الإلكتروني غير صحيحة"
                                            : "Invalid email format" })); });
                                }
                                else {
                                    setErrors(function (prev) { return (__assign(__assign({}, prev), { ProjectManagerEmail: "" })); });
                                }
                            } }),
                        React.createElement("div", { className: "project-details" },
                            React.createElement("label", null, " ")),
                        React.createElement("div", { className: "project-details" },
                            React.createElement("label", null, "Request Details")),
                        React.createElement("div", { className: "project-details" },
                            React.createElement("label", null, " ")),
                        React.createElement(TextField, { onRenderLabel: function (props) { return (React.createElement("div", { style: {
                                    display: "flex",
                                    alignItems: "end",
                                    fontWeight: 600,
                                    marginBottom: 4,
                                } },
                                React.createElement("span", null,
                                    " ",
                                    isAr ? "بروتوكول النقل *" : "Transport Protocol *"),
                                React.createElement(TooltipHost, { content: TextfieldTipLabels.SourceType, directionalHint: DirectionalHint.bottomCenter, hostClassName: "detailtolltip_popup" },
                                    React.createElement(Icon, { className: "details_icon", iconName: "Info", styles: {
                                            root: {
                                                fontSize: 14,
                                                color: "#0078D4",
                                                cursor: "pointer",
                                                marginLeft: 6,
                                                alignItems: "end",
                                                marginTop: 1,
                                            },
                                        } })))); }, value: formData.TransportProtocol, className: "form-text project_fields ".concat(errors.TransportProtocol ? "error-field" : ""), onChange: function (ev, newValue) {
                                updateFormData(ev, newValue, "TransportProtocol");
                            } }),
                        React.createElement(TextField
                        // label={isAr ? "نوع المصدر *" : "Source Type *"}
                        , { 
                            // label={isAr ? "نوع المصدر *" : "Source Type *"}
                            onRenderLabel: function (props) { return (React.createElement("div", { style: {
                                    display: "flex",
                                    alignItems: "end",
                                    fontWeight: 600,
                                    marginBottom: 4,
                                } },
                                React.createElement("span", null, isAr ? "نوع المصدر *" : "Source Type *"),
                                React.createElement(TooltipHost, { content: TextfieldTipLabels.SourceType, directionalHint: DirectionalHint.bottomCenter, hostClassName: "detailtolltip_popup" },
                                    React.createElement(Icon, { className: "details_icon", iconName: "Info", styles: {
                                            root: {
                                                fontSize: 14,
                                                color: "#0078D4",
                                                cursor: "pointer",
                                                marginLeft: 6,
                                                alignItems: "end",
                                                marginTop: 1,
                                            },
                                        } })))); }, value: formData.SourceType, className: "form-text project_fields ".concat(errors.SourceType ? "error-field" : ""), onChange: function (ev, newValue) {
                                updateFormData(ev, newValue, "SourceType");
                            } }),
                        React.createElement(TextField, { onRenderLabel: function (props) { return (React.createElement("div", { style: {
                                    display: "flex",
                                    alignItems: "end",
                                    fontWeight: 600,
                                    marginBottom: 4,
                                } },
                                React.createElement("span", null, isAr
                                    ? "عنوان IP الفرعي المصدر/عنوان IP *"
                                    : "Source IP Subnet/ IP Address *"),
                                React.createElement(TooltipHost, { directionalHint: DirectionalHint.bottomCenter, hostClassName: "detailtolltip_popup", content: TextfieldTipLabels.SourceIP },
                                    React.createElement(Icon, { className: "details_icon", iconName: "Info", styles: {
                                            root: {
                                                fontSize: 14,
                                                color: "#0078D4",
                                                cursor: "pointer",
                                                marginLeft: 6,
                                                alignItems: "end",
                                                marginTop: 1,
                                            },
                                        } })))); }, value: formData.SourceIP, className: "form-text project_fields ".concat(errors.SourceIP ? "error-field" : ""), onChange: function (ev, newValue) {
                                updateFormData(ev, newValue, "SourceIP");
                            } }),
                        React.createElement(TextField, { onRenderLabel: function (props) { return (React.createElement("div", { style: {
                                    display: "flex",
                                    alignItems: "end",
                                    fontWeight: 600,
                                    marginBottom: 4,
                                } },
                                React.createElement("span", null, isAr ? "رقم منفذ المصدر *" : "Source Port Number *"),
                                React.createElement(TooltipHost, { content: TextfieldTipLabels.SourcePortNumber, directionalHint: DirectionalHint.bottomCenter, hostClassName: "detailtolltip_popup" },
                                    React.createElement(Icon, { className: "details_icon", iconName: "Info", styles: {
                                            root: {
                                                fontSize: 14,
                                                color: "#0078D4",
                                                cursor: "pointer",
                                                marginLeft: 6,
                                                alignItems: "end",
                                                marginTop: 1,
                                            },
                                        } })))); }, 
                            // label={isAr ? "رقم منفذ المصدر *" : "Source Port Number *"}
                            value: formData.SourcePortNumber, className: "form-text  ".concat(errors.SourcePortNumber ? "error-field" : ""), onChange: function (ev, newValue) {
                                updateFormData(ev, newValue, "SourcePortNumber");
                            } }),
                        React.createElement(TextField, { onRenderLabel: function (props) { return (React.createElement("div", { style: {
                                    display: "flex",
                                    alignItems: "end",
                                    fontWeight: 600,
                                    marginBottom: 4,
                                } },
                                React.createElement("span", null, isAr
                                    ? "هل المصدر هو عنوان NAT/PAT؟ *"
                                    : "Is Source a NAT/PAT Address? *"),
                                React.createElement(TooltipHost, { content: TextfieldTipLabels.SourceNATPAT, directionalHint: DirectionalHint.bottomCenter, hostClassName: "detailtolltip_popup" },
                                    React.createElement(Icon, { className: "details_icon", iconName: "Info", styles: {
                                            root: {
                                                fontSize: 14,
                                                color: "#0078D4",
                                                cursor: "pointer",
                                                marginLeft: 6,
                                                alignItems: "end",
                                                marginTop: 1,
                                            },
                                        } })))); }, 
                            // label={
                            //   isAr
                            //     ? "هل المصدر هو عنوان NAT/PAT؟ *"
                            //     : "Is Source a NAT/PAT Address? *"
                            // }
                            value: formData.SourceNATPAT, className: "form-text  ".concat(errors.SourceNATPAT ? "error-field" : ""), onChange: function (ev, newValue) {
                                updateFormData(ev, newValue, "SourceNATPAT");
                            } }),
                        React.createElement(TextField, { onRenderLabel: function (props) { return (React.createElement("div", { style: {
                                    display: "flex",
                                    alignItems: "end",
                                    fontWeight: 600,
                                    marginBottom: 4,
                                } },
                                React.createElement("span", null, isAr
                                    ? "شبكة فرعية الوجهة/ عنوان IP/ أي *"
                                    : "Destination Subnet/ IP Address/ Any *"),
                                React.createElement(TooltipHost, { content: TextfieldTipLabels.DestinationSubnet, directionalHint: DirectionalHint.bottomCenter, hostClassName: "detailtolltip_popup" },
                                    React.createElement(Icon, { className: "details_icon", iconName: "Info", styles: {
                                            root: {
                                                fontSize: 14,
                                                color: "#0078D4",
                                                cursor: "pointer",
                                                marginLeft: 6,
                                                alignItems: "end",
                                                marginTop: 1,
                                            },
                                        } })))); }, 
                            // label={
                            //   isAr
                            //     ? "شبكة فرعية الوجهة/ عنوان IP/ أي *"
                            //     : "Destination Subnet/ IP Address/ Any *"
                            // }
                            value: formData.DestinationSubnet, className: "form-text  ".concat(errors.DestinationSubnet ? "error-field" : ""), onChange: function (ev, newValue) {
                                updateFormData(ev, newValue, "DestinationSubnet");
                            } }),
                        React.createElement(TextField, { onRenderLabel: function (props) { return (React.createElement("div", { style: {
                                    display: "flex",
                                    alignItems: "end",
                                    fontWeight: 600,
                                    marginBottom: 4,
                                } },
                                React.createElement("span", null, isAr
                                    ? "رقم منفذ الوجهة *"
                                    : "Destination Port Number *"),
                                React.createElement(TooltipHost, { content: TextfieldTipLabels.DestinationPortNo, directionalHint: DirectionalHint.bottomCenter, hostClassName: "detailtolltip_popup" },
                                    React.createElement(Icon, { className: "details_icon", iconName: "Info", styles: {
                                            root: {
                                                fontSize: 14,
                                                color: "#0078D4",
                                                cursor: "pointer",
                                                marginLeft: 6,
                                                alignItems: "end",
                                                marginTop: 1,
                                            },
                                        } })))); }, 
                            // label={
                            //   isAr ? "رقم منفذ الوجهة *" : "Destination Port Number *"
                            // }
                            value: formData.DestinationPortNo, className: "form-text  ".concat(errors.DestinationPortNo ? "error-field" : ""), onChange: function (ev, newValue) {
                                updateFormData(ev, newValue, "DestinationPortNo");
                            } }),
                        React.createElement(TextField, { onRenderLabel: function (props) { return (React.createElement("div", { style: {
                                    display: "flex",
                                    alignItems: "end",
                                    fontWeight: 600,
                                    marginBottom: 4,
                                } },
                                React.createElement("span", null, isAr ? "نوع الوجهة *" : "Destination Type *"),
                                React.createElement(TooltipHost, { content: TextfieldTipLabels.DestinationType, directionalHint: DirectionalHint.bottomCenter, hostClassName: "detailtolltip_popup" },
                                    React.createElement(Icon, { className: "details_icon", iconName: "Info", styles: {
                                            root: {
                                                fontSize: 14,
                                                color: "#0078D4",
                                                cursor: "pointer",
                                                marginLeft: 6,
                                                alignItems: "end",
                                                marginTop: 1,
                                            },
                                        } })))); }, 
                            // label={isAr ? "نوع الوجهة *" : "Destination Type *"}
                            value: formData.DestinationType, className: "form-text  ".concat(errors.DestinationType ? "error-field" : ""), onChange: function (ev, newValue) {
                                updateFormData(ev, newValue, "DestinationType");
                            } }),
                        React.createElement(TextField, { onRenderLabel: function (props) { return (React.createElement("div", { style: {
                                    display: "flex",
                                    alignItems: "end",
                                    fontWeight: 600,
                                    marginBottom: 4,
                                } },
                                React.createElement("span", null, isAr ? "ثنائي الاتجاه؟ *" : "Bi-Directional? *"),
                                React.createElement(TooltipHost, { content: TextfieldTipLabels.Directional, directionalHint: DirectionalHint.bottomCenter, hostClassName: "detailtolltip_popup" },
                                    React.createElement(Icon, { className: "details_icon", iconName: "Info", styles: {
                                            root: {
                                                fontSize: 14,
                                                color: "#0078D4",
                                                cursor: "pointer",
                                                marginLeft: 6,
                                                alignItems: "end",
                                                marginTop: 1,
                                            },
                                        } })))); }, 
                            // label={isAr ? "ثنائي الاتجاه؟ *" : "Bi-Directional? *"}
                            value: formData.Directional, className: "form-text  ".concat(errors.Directional ? "error-field" : ""), onChange: function (ev, newValue) {
                                updateFormData(ev, newValue, "Directional");
                            } }),
                        React.createElement(DatePicker, { label: isAr ? "المدة من *" : "Duration From *", firstDayOfWeek: firstDayOfWeek, placeholder: "Select a date...", ariaLabel: "Select a date", onSelectDate: function (e) {
                                handleInputChange("DurationFrom", e);
                            }, className: "form-text ".concat(errors.DurationFrom ? "has-error" : "no-error"), 
                            // DatePicker uses English strings by default. For localized apps, you must override this prop.
                            strings: defaultDatePickerStrings }),
                        React.createElement(DatePicker, { label: isAr ? "المدة إلى *" : "Duration To *", firstDayOfWeek: firstDayOfWeek, placeholder: "Select a date...", ariaLabel: "Select a date", onSelectDate: function (e) {
                                handleInputChange("DurationTo", e);
                            }, className: "form-text ".concat(errors.DurationTo ? "has-error" : "no-error"), 
                            // DatePicker uses English strings by default. For localized apps, you must override this prop.
                            strings: defaultDatePickerStrings }))),
                    (formData.serviceName == "Block Website" ||
                        formData.serviceName == "Unblock Website") && (React.createElement(React.Fragment, null,
                        React.createElement(TextField, { label: isAr ? "رابط URL *" : "URL Link *", value: formData.URLLink, className: "form-text  ".concat(errors.URLLink ? "error-field" : ""), onChange: function (ev, newValue) {
                                updateFormData(ev, newValue, "URLLink");
                            } })))),
                formData.serviceName == "Communication Matrix" && (React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "description_div" },
                        React.createElement(TextField, { onRenderLabel: function (props) { return (React.createElement("div", { style: {
                                    display: "flex",
                                    alignItems: "end",
                                    fontWeight: 600,
                                    marginBottom: 4,
                                } },
                                React.createElement("span", null, isAr ? "وصف المشروع *" : "Project Description *"),
                                React.createElement(TooltipHost, { content: TextfieldTipLabels.descriptionP, directionalHint: DirectionalHint.bottomCenter, hostClassName: "detailtolltip_popup" },
                                    React.createElement(Icon, { className: "details_icon", iconName: "Info", styles: {
                                            root: {
                                                fontSize: 14,
                                                color: "#0078D4",
                                                cursor: "pointer",
                                                marginLeft: 6,
                                                alignItems: "end",
                                                marginTop: 1,
                                            },
                                        } })))); }, 
                            // label={isAr ? "وصف *" : "Description *"}
                            value: formData.descriptionP, multiline: true, rows: 4, type: "text-area", className: "text-area ".concat(errors.descriptionP ? "error-field" : ""), onChange: function (ev, newValue) {
                                return updateFormData(ev, newValue, "descriptionP");
                            }, styles: {
                                root: { color: "#555" },
                                fieldGroup: { border: "1px solid #ccc" },
                                field: { color: "#555" },
                            } })))),
                React.createElement("div", { className: "description_div", style: {
                        marginTop: "25px",
                    } },
                    React.createElement(TextField, { label: isAr ? "وصف *" : "Description *", value: formData.description, multiline: true, rows: 4, type: "text-area", className: "text-area ".concat(errors.description ? "error-field" : ""), onChange: function (ev, newValue) {
                            return updateFormData(ev, newValue, "description");
                        }, styles: {
                            root: { color: "#555" },
                            fieldGroup: { border: "1px solid #ccc" },
                            field: { color: "#555" },
                        } })),
                React.createElement(Col, { className: "mt-4" },
                    React.createElement("div", { style: { display: "flex", alignItems: "end" } },
                        React.createElement("label", { style: {
                                marginRight: "4px",
                                marginTop: "24px",
                                fontSize: "12px",
                                fontFamily: "Segoe UI",
                                color: "#555555",
                                fontWeight: "500",
                                marginBottom: "11.5px",
                            } }, isAr
                            ? "أي مستندات أو صور تساعد في إثبات القضية:"
                            : "Any documents or pictures (optional):")),
                    React.createElement("div", { className: "attachment-container" },
                        React.createElement("div", { className: "attachment-placeholder" },
                            React.createElement("img", { className: "attachment-icon", src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKoSURBVHgB7ZnbjdpAFIaPDYLX7WDdQUBcJJ4CFWRTQUgHbAVABbAVQCpIOljyhIS4leAO4rwB4pL/sMcbxxdij8dWFO0vjcY7c8Z8mjOeOXPWoAgtFotKsVgc4bGCckfpZO/3+06r1bIpoYywxuVy+WCa5kTAHJSfpK57qZUgA4Cbzca6XC7PeOT6CaCDarXqkKLW67WdBtL0N5zP567ATWu1Wi8NnE9bfm+5XH7GJMReMgFAwzDeXztM8wtpFN7bIYFkD8WFNKM6drudTRrFnhBIG6USF9KkHBUC+fVvY3IFZAHS9kC2V6vV5JZ9boDz+dxyn72QqLu3IDMHhBu/cV0qlfre9hDIUdj4ImUs7AZjQH5gCOyJbXpx7VVof7VDfw+QDra24R/jKWN5Zuo7ioXS9hWLfkN2/eMzn0EWQzKMbCuVMBs5vQLSCggX9VDdw02PYf1yKs3C+uD+sGZ9LgZcHy4ayVqakCZpARS4gfu3fJV90qDUgD44N7DgE2OgAzIVIOLGTy4cFvlnkrjxeDx2dEEqA0pQOxW4R3wYU7ev2WxuT6fTR34WyB4pSgmQrwMScTPcEHBjv02j0ZjJrDLkiGebFKQEWCgUHlDdCdwgyo5nlWeXXiCrpCAlQIbiH7wF57Ed80nCVwdSkPJGjU13m8B2RorKPR5MqjfAtPrnAXWHWz9QLqRRWgElMNUqrYAasxCv+r/WoBz67yiFcPRt6/X6U1z7RIBYY3zgVyiF8A4bVWaAHEJZlE6xj0hWIkC5ndmUo8I+kmtUjPSvRTkJ11F32QR2gQAgFvGMa8R8Wi49cYTf7EkdcH8AUMJ4myTzxNEzZSROKElOhj8+53A4DP02oUl0b56a8pHDFy2+y/g7jKgRAjkgPf+GiBRnvzBz46jE+i8JiDR7F2tlUAAAAABJRU5ErkJggg==", alt: "Attachment Icon" }),
                            isAr
                                ? "إرفاق الملف بتنسيق PNG أو JPG أو PDF (اختياري)"
                                : "Attach file in PNG, JPG, or PDF format (optional)",
                            React.createElement("input", { type: "file", 
                                // ref={inputRef}
                                multiple: true, ref: function (element) {
                                    fileInfo = element;
                                }, onChange: function (e) {
                                    readFile(e, "files");
                                } })),
                        React.createElement("span", { style: { color: "red" } }, errors.files || showErrorUpload)),
                    uploadedFiles.map(function (file, index) { return (React.createElement("div", { key: index },
                        React.createElement("div", { className: "uploadeditems" },
                            React.createElement("strong", null, file.name),
                            React.createElement("div", { className: "progresscontainer" },
                                React.createElement("div", { className: "progressbar", id: "progressbar", style: { width: "".concat(file["progress"], "%") } })),
                            React.createElement("div", { className: "cancelbtn", onClick: function () {
                                    removeAttachment(file.name); // Pass the file name to remove it
                                } }, "X")))); })),
                React.createElement("div", { className: "buttonContainer" },
                    React.createElement(PrimaryButton, { onClick: function () {
                            handleSubmit();
                        }, styles: { root: { fontSize: "20px" } }, text: !isAr ? "Submit" : "يُقدِّم", className: "submit-formbtn" }),
                    React.createElement(DefaultButton, { text: !isAr ? "Cancel" : "يلغي", className: "cancel-formbtn", onClick: function () {
                            setFormData({
                                requestedFor: "",
                                serviceName: "",
                                officeLocation: "",
                                PhoneNumber: "",
                                RequesterEmail: "",
                                description: "",
                                files: [],
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
                            if (inputRef.current)
                                inputRef.current.value = "";
                            fileInfo = null;
                        } })))),
        React.createElement("div", { className: "testelement" })));
};
export default ServiceUIForm;
//# sourceMappingURL=ServiceUIForm.js.map