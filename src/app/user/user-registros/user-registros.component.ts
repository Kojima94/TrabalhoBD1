import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { prefixo } from 'src/app/registros/models/url';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-registros',
  templateUrl: './user-registros.component.html',
  styleUrls: ['./user-registros.component.css']
})
export class UserRegistrosComponent implements OnInit {

  json: any;
  displayedColumns: string[];
  // tslint:disable-next-line: no-use-before-declare
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  inicio: string;
  fim: string;

  constructor(public dialog: MatDialog, public usvc: UserService) { }

  ngOnInit() {
    if (window.innerWidth <= 360) {
      this.displayedColumns = ['tipo', 'hora', 'dia'];
    } else {
      this.displayedColumns  = ['ID', 'tipo', 'hora', 'dia'];
    }
    this.buscarRegistrosUser();
  }

  buscarRegistrosUser() {
    this.usvc.buscarRegistrosUser().subscribe(res => {
      this.json = res;
      this.json.map(item => item.DIA = (new Date(item.DIA).toLocaleDateString('pt-BR')));
      this.json.map(item => item.HORA = (new Date(item.HORA).toLocaleTimeString('pt-BR')));
      this.dataSource = new MatTableDataSource(this.json);
      this.dataSource.paginator = this.paginator;
    });
  }

  buscarRegData() {
    this.usvc.buscarPorPeriodo(this.inicio, this.fim).subscribe(res => {
      this.json = res;
      this.json.map(item => item.DIA = (new Date(item.DIA).toLocaleDateString('pt-BR')));
      this.json.map(item => item.HORA = (new Date(item.HORA).toLocaleTimeString('pt-BR')));
      this.dataSource = new MatTableDataSource(this.json);
      this.dataSource.paginator = this.paginator;
    });
  }

}
