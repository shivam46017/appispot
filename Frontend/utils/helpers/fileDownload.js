import JSZip from "jszip";
import { saveAs } from 'file-saver'

// Function for make zip file and download it

function downloadImage(fileUrls, zipFilename) {
  // Initialize jsZip
  let zip = new JSZip();

  // Use Promise.all to fetch all files at once
  Promise.all(fileUrls.map(url => fetch(url, {
    responseType: 'url'
  })))
      .then(responses => 
          // Convert each response into a blob
          Promise.all(responses.map(response => response.blob()))
      )
      .then(blobs => {
        console.log(blobs)
          // Add each blob to the zip as a file
          blobs.forEach((blob, index) => zip.file(fileUrls[index].split('/').pop(), blob));
          
          // Generate zip and trigger download
          zip.generateAsync({type:"blob"}).then(function(content) {
              saveAs(content, zipFilename);
          });
      });
}


export default downloadImage;
