import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
  NgForm,
} from '@angular/forms';
/**
 * @title Basic expansion panel
 *
 */
import { Array } from './model';
@Component({
  selector: 'expansion-overview-example',
  templateUrl: 'expansion-overview-example.html',
  styleUrls: ['expansion-overview-example.css'],
})
export class ExpansionOverviewExample {
  rows: FormArray;
  arr:Array={Factors:'0',
             Levels:'0' };
  addForm: FormGroup;
  panelOpenState: boolean = false;
  flag: boolean = false;
  obj:any
  Number_of_factor: string = '0';
  
  constructor(private fb: FormBuilder,private http: HttpClient) {
    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required],
    });
    this.rows = this.fb.array([]);
  }
  ngOnInit() {
    this.addForm.get('items').valueChanges.subscribe((val) => {
      if (val === true) {
        this.addForm.get('items_value').setValue('yes');

        this.addForm.addControl('rows', this.rows);
      }
      if (val === false) {
        this.addForm.get('items_value').setValue('no');
        this.addForm.removeControl('rows');
      }
    });
  }

  onSave() {
    if (Number(this.arr.Factors) != 0) {
      this.flag = true;
    } else {
      this.flag = false;
    }
    


  this.http.post("http://127.0.0.1:8000/",this.arr)
  
    }
  onAddRow() {
    this.rows.push(this.createItemFormGroup());
  }

  onRemoveRow(rowIndex: number) {
    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      Factor_name: null,
      Level_values: null,
    });
  }
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
