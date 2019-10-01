//.ts
import { Component, OnInit } from '@angular/core';
import { Empdetail } from './empdetail';

import { EmpService } from './emp.service';
import { NgForm, FormGroup, FormBuilder, FormControlName, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { ConfirmationService } from "primeng/api";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {
    employee:Empdetail[]=[];
    empid:number;
    employeename:string;
    department:string;
     i1:number;

     //pagination
     config: any;
     collection = [];

     //from builder
    // add:FormGroup;


  constructor(private _data: EmpService, private route: ActivatedRoute, private router: Router,
    private confirmationService: ConfirmationService) {

    this.config = {
      currentPage: 1,
      itemsPerPage: 10
    };

    this.route.queryParamMap
      .map(params => params.get('page'))
      .subscribe(page => this.config.currentPage = page);

      for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
      }

  }

  ngOnInit() {

    // this.add = this.fb.group({
    //   name : new FormControl(),
    //   dept: new FormControl()
    // });

     this._data.getAllEmployees().subscribe(
       (data:Empdetail[])=>
       {
        this.employee=data
       }

     );
  }
  onEmployeeDelete(id:number)
  {
    this._data.deleteEmployee(id).subscribe(
      (data:any)=>{

        this._data.getAllEmployees().subscribe(
          (data:Empdetail[])=>
          {
           this.employee=data
          }
        );
      }
    );
    // alert('Selected Data Delete');
  }



  onEmployeeSave(f:NgForm)
  {
    this._data.addemployee(f.value).subscribe((data:any) => {
      this._data.getAllEmployees().subscribe(
        (data:Empdetail[])=>
        {
         this.employee=data
        }
      );
      alert("Employee Added");
    });
  }

  SearchEmployee(value) {
    if (value != "") {
      this.employee = this.employee.filter(x => x.name.indexOf(value) != -1);
    } else {
      this._data.getAllEmployees().subscribe(
        (data: Empdetail[]) => {
          this.employee = data;
        },
        function(error) {
          alert(error);
        },
        function() {}
      );
    }
  }

  editEmployeeget(i)
  {
     this.empid=this.employee[i].id;
    this.employeename=this.employee[i].name;
    this.department=this.employee[i].description;
    this.i1=i;
  }

  UpdateEmployee(f1)
  {
      var req = {
        id:f1.value.id,
        organizationId:this.employee[this.i1].organizationId,
        name:f1.value.name,
        description:f1.value.description,
        isactive:this.employee[this.i1].isactive,
        createdby:this.employee[this.i1].createdby,
        createddate:this.employee[this.i1].createddate,
        modifiedby:this.employee[this.i1].modifiedby,
        modifieddate:this.employee[this.i1].modifieddate
      }
      this._data.addemployee(req).subscribe((data:any) => {
        this._data.getAllEmployees().subscribe(
          (data:Empdetail[])=>
          {
           this.employee=data
          }

        );
        alert("Record Edited.");
      });
  }
  //pagination
    pageChange(newPage: number) {
		  this.router.navigate(['/employee'], { queryParams: { page: newPage } });
	    }


      confirmDelete(id: number) {
        console.log(id);
        this.confirmationService.confirm({
            message: "Are you sure that you want to proceed?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                this.onEmployeeDelete(id);
                // this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
            },
            reject: () => {
                // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
            }
        });
      }

}
