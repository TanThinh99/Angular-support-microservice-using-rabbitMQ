import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss', './../../../dist/output.css']
})
export class OrderComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  today = new Date();
  minDate: string = '';
  isOrderConfirmed: any = null;
  isSubmitting = false;

  customers: Array<any> = [];
  products: Array<any> = [];

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.orderService.getCustomers().then(res => {
      this.customers = res;
    });

    this.orderService.getProducts().then(res => {
      this.products = res;
    });

    this.form = new FormGroup({
      cid: new FormControl("", [Validators.required]),
      pid: new FormControl("", [Validators.required]),
      quantity: new FormControl(2, [Validators.required]),
      orderDate: new FormControl("", [Validators.required]),
      description: new FormControl("")
    });

    let today = new Date();
    let tomorrow = new Date(today.setDate(today.getDate() + 1));
    this.minDate = tomorrow.toISOString().split('T')[0];
  }

  onSubmitBtnClick(): void {
    this.isSubmitting = true;
    console.log(this.form.value);
    this.orderService.createTransaction(this.form.value).then(res => {
      console.log('res', res);
      this.isSubmitting = false;
      
      let product = this.products.find(each => each.id === this.form.value.pid);
      this.isOrderConfirmed = (this.form.value.quantity <= product.qoh);
    });
  }
}
