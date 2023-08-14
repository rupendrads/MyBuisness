import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { FileUploadService } from '../../services/fileUpload.service';

@Component({
	selector: 'app-file-upload',
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {	
	file: File | undefined = undefined;
	@Output() fileSelection = new EventEmitter<File>();

	constructor(private fileUploadService: FileUploadService) { }

	ngOnInit(): void {
	}

	onChange(event: any) {		
		if (event.target.files && event.target.files[0]) {
			this.file = event.target.files[0];
			this.fileSelection.emit(this.file);			
		  }

        console.log(this.file);
	}

	onUpload() {
		console.log(this.file);
		// this.fileUploadService.upload(this.file).subscribe(
		// 	(event: any) => {
		// 		if (typeof (event) === 'object') {		
		// 			this.shortLink = event.link;
		// 			this.loading = false;
		// 		}
		// 	}
		// );
	}
}
