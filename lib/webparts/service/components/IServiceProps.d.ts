export interface IServiceProps {
    context: any;
    Apilink: string;
    subscriptionId: string;
    OcpApimKey: string;
    Subject: string;
}
export interface IUserProfile {
    displayName: string;
    jobTitle: string;
    department: string;
    employeeId: string;
    mail: string;
}
export interface IServiceRequestFormData {
    requestedBy?: string;
    requestedFor: string;
    serviceName: string;
    officeLocation: string;
    PhoneNumber: string;
    RequesterEmail: string;
    EntityDepartment: string;
    ProjectName: string;
    ProjectManagerEmail: string;
    TransportProtocol: string;
    SourceType: string;
    SourceIP: string;
    SourcePortNumber: string;
    SourceNATPAT: string;
    DestinationSubnet: string;
    DestinationPortNo: string;
    DestinationType: string;
    Directional: string;
    descriptionP: string;
    description: string;
    files?: any;
    DurationFrom: Date;
    DurationTo: Date;
    URLLink: string;
}
//# sourceMappingURL=IServiceProps.d.ts.map