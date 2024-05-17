import { Component, OnInit } from '@angular/core';
import { CrudService} from '../serviços/crud.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  pedidos: any[] = ['1'];

  constructor(private crud: CrudService, ) {}

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    // this.crud.carrinho.read().subscribe(res => {
    //   console.log(res)
    // })
  }

}
