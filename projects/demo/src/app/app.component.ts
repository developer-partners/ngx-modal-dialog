import { Component } from '@angular/core';
import { ModalService } from 'projects/ngx-modal-dialog/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private readonly _modalService: ModalService) {
  }

  public showModal(): void {
    this._modalService.show(ModalDemoComponent, {
      title: 'Default Modal',
    })
  }

  public showBottom(): void {
    this._modalService.show(ModalDemoComponent, {
      title: 'Docked Bottom',
      position: 'bottom'
    });
  }

  public showLeft(): void {
    this._modalService.show(ModalDemoComponent, {
      title: 'Docked Left',
      position: 'left'
    });
  }

  public showTop(): void {
    this._modalService.show(ModalDemoComponent, {
      title: 'Docked Top',
      position: 'top'
    });
  }

  public showRight(): void {
    this._modalService.show(ModalDemoComponent, {
      title: 'Docked Right',
      position: 'right'
    });
  }
}

@Component({
  template: `<p>Hellow from modal!</p>`
})
export class ModalDemoComponent {

}
