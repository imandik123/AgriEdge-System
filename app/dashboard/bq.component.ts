import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: any[] = [];

  constructor(private http: HttpClient) {}

  getData() {
    const projectId = 'your-project-id';
    const datasetId = 'your-dataset-id';
    const tableId = 'your-table-id';

    const url = `https://bigquery.googleapis.com/bigquery/v2/projects/${projectId}/queries`;

    const query = `SELECT * FROM \`${projectId}.${datasetId}.${tableId}\``;

    const requestBody = {
      query,
      useLegacySql: false
    };

    this.http.post(url, requestBody).subscribe((response: any) => {
      this.data = response['rows'].map((row: any) => {
        return row['f'].map((field: any) => field['v']);
      });
    });
  }
}
