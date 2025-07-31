var TollTipLabels = {
    TransportProtocol: "The desired protocol used by the application, for most applications the protocol will be TCP, but could be UDP.",
    SourceType: "Source Type: Indicate the functionality of the source device involved in the port communication.",
    SourceIP: "Source IP Subnet/IP Address and Source Subnet Mask: The complete IP address of the host or network that will initiate the connection and the complete subnet mask of the source network address in dotted decimal notation; i.e., (255.255.255.0).  If the source IP address is a network, specify the Subnet Mask.  If the source IP address is a host, leave this blank.",
    SourcePortNumber: "Source Port Number: The port number(s) from which the host or network initiates communication or sends data.",
    SourceNATPAT: 'Is source a NAT/PAT address: Are you using NAT/PAT on the source IP address from your private network?  It is very important to answer "NAT", "PAT", or "None".”',
    DestinationSubnet: "Destination IP Address: The complete IP address of the host or network that will receive the connection and the complete subnet mask of the destination network address in dotted decimal notation; i.e., (255.255.255.0).  If the destination IP address is a network, specify the Subnet Mask.  If the destination IP address is a host, leave this blank.",
    DestinationPortNo: "Destination Port Number: The port number(s) from which the host or network responds.",
    DestinationType: "Destination Type: Indicate the functionality of the destination device involved in the port communication.",
    Directional: "Bi-directional: Indicate if this connection will be initiated from both the source and destination IP address. Document different port requirements, as needed, to support bi-directional.",
    descriptionP: "Descriptions: Describe the nature of the connection",
};
export default TollTipLabels;
//# sourceMappingURL=TextFieldsTipDetails.js.map