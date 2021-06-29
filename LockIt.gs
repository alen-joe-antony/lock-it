/**
 *  Make Google Drive files Read only to prevent accidental editting
 *  Author: Alen Joe Antony
 *  Email : alenjantony@gmail.com 
 **/
 

const doc = DocumentApp.getActiveDocument();
const sheet = SpreadsheetApp.getActiveSpreadsheet();
const slide = SlidesApp.getActivePresentation();


function onOpen(e) {
	if(doc !== null) {
		DocumentApp.getUi().createMenu('🔒')
		  .addItem('Make File ReadOnly', 'makeFileReadOnly')
			.addToUi();
	}
	
	else if(sheet !== null) {
		SpreadsheetApp.getUi().createMenu('🔒')
		  .addItem('Make File ReadOnly', 'makeFileReadOnly')
			.addToUi();
	}
	
	else if(slide !== null) {
		SlidesApp.getUi().createMenu('🔒')
		  .addItem('Make File ReadOnly', 'makeFileReadOnly')
			.addToUi();
	}
}


function onInstall(e) {
  onOpen(e);
}


const makeFileReadOnly = () => {
  var fileId = '';

	if(doc !== null) {
		fileId = doc.getId();
	}
	
	else if(sheet !== null) {
		fileId = sheet.getId();
	}
	
	else if(slide !== null) {
		fileId = slide.getId();
	}
	
  UrlFetchApp.fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'PATCH',
    contentType: 'application/json',
    headers: {
      Authorization: `Bearer ${ScriptApp.getOAuthToken()}`,
    },
    payload: JSON.stringify({
      contentRestrictions: [
        {
          readOnly: true,
          reason: 'Prevent accidental editing',
        },
      ],
    }),
  });
  
  /**
   *  For requesting correct scope, do not delete the following line
   *  Deleting the following line results in 403: insufficientPermissions Error
   **/ 
  
  // var file = DriveApp.getFileById().setName()
};
