import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter and Route

import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from '@microsoft/sp-webpart-base';
import { sp } from "@pnp/sp/presets/all";

import * as strings from 'CommPageWebPartStrings';

import './CommPageWebPart.module.scss';

import CommPage from './components/CommPage';






export default class CareerPageWebPart extends BaseClientSideWebPart<{}> {

  // Define a state to track whether the initial load has occurred
  state = {
    initialLoad: true,
  };


  protected onInit(): Promise<void> {
    return super.onInit().then(_ => {
      // other init code may be present
      sp.setup({
        spfxContext: this.context as any
      });
    });
  }

  public render(): void {
    

    const element: React.ReactElement<{}> = (
      
      <Router>
        <React.Fragment> {/* Wrap the app with React.Fragment */}
          <CommPage context={this.context}/>
        </React.Fragment>
      </Router>
      
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
