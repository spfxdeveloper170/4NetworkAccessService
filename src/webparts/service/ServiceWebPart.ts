import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,PropertyPaneToggle,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'ServiceWebPartStrings';
import Service from './components/Service';
import { IServiceProps } from './components/IServiceProps';
export interface IServiceWebPartProps {
  Apilink: string;
  subscriptionId: string;
  OcpApimKey: string;
  Subject:string;
   isredirect:boolean;

    attachmentApilink: string;
  UserRecIdApilink: string;
  Category: string;
}
export default class ServiceWebPart extends BaseClientSideWebPart<IServiceWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IServiceProps> = React.createElement(
      Service,
      {
        context:this.context,
        Apilink:this.properties.Apilink,
        subscriptionId:this.properties.subscriptionId,
        OcpApimKey:this.properties.OcpApimKey,
        Subject:this.properties.Subject,
           isredirect: this.properties.isredirect,

         attachmentApilink: this.properties.attachmentApilink,
        UserRecIdApilink: this.properties.UserRecIdApilink,
        Category: this.properties.Category,
      }
    );
    ReactDom.render(element, this.domElement);
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('Apilink', {
                  label:"API Link",
                  value:this.properties.Apilink,
                }),
                  PropertyPaneTextField('attachmentApilink', {
                  label: "Attachment API Link",
                  value: this.properties.attachmentApilink,
                }),
                PropertyPaneTextField('UserRecIdApilink', {
                  label: "User RecId API Link",
                  value: this.properties.UserRecIdApilink,
                }),
                PropertyPaneTextField('Category', {
                  label: "Category",
                  value: this.properties.Category,
                }),
                PropertyPaneTextField('subscriptionId', {
                  label:"subscription Id",
                  value:this.properties.subscriptionId,
                }),
                PropertyPaneTextField('OcpApimKey', {
                  label:"Ocp-Apim-Subscription-Key",
                  value:this.properties.OcpApimKey,
                }),
                PropertyPaneTextField('Subject', {
                  label:"Service Subject",
                  value:this.properties.OcpApimKey,
                }),
                 PropertyPaneToggle('isredirect',{
                  label:"Is Redirect",
                  offText:"No",
                  onText:"Yes",
                  checked:this.properties.isredirect
                })
              ]
            }
          ]
        }
      ]
    };
  }
}