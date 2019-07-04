import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Contact, ContactField, ContactName, Contacts } from '@ionic-native/contacts';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private win: WebView,private contacts: Contacts, private sanitizer: DomSanitizer) {}
  contactList = [];

  getContacts(): void {
    this.contacts.find(
      ["displayName", "phoneNumbers","photos"],
      {multiple: true, hasPhoneNumber: true}
      ).then((contacts) => {
        for (var i=0 ; i < contacts.length; i++){
          if(contacts[i].displayName !== null) {
            var contact = {};
            contact["name"]   = contacts[i].displayName;
            contact["number"] = contacts[i].phoneNumbers[0].value;
            if(contacts[i].photos != null) {
              console.log(contacts[i].photos);
              
              contact["image"] = this.win.convertFileSrc(contacts[i].photos[0].value);
              console.log(contact);
            } else {
              contact["image"] = "assets/dummy-profile-pic.png";
            }
            this.contactList.push(contact);
          }
        }
    });
  }
}
