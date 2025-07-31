import * as React from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import "../css/style.css";
import { IUserProfile, IServiceRequestFormData } from "../webparts/service/components/IServiceProps";
import "@pnp/sp/site-users/web";
import "@pnp/sp/lists";
import "@pnp/sp/items";
export interface IRequestUIFormProps {
    context: WebPartContext;
    userprofileAD: IUserProfile;
    EmpId: string;
    onErrorRequiredFields: () => void;
    onSave: (formData: IServiceRequestFormData) => Promise<void>;
}
declare const ServiceUIForm: React.FC<IRequestUIFormProps>;
export default ServiceUIForm;
//# sourceMappingURL=ServiceUIForm.d.ts.map