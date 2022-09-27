import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalReference, ModalService } from 'projects/ngx-modal-dialog/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public person: Person;
  public modalPosition: 'center' | 'top' | 'bottom' | 'left' | 'right';
  public fruitName: string;

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

  public showWithResult(): void {
    this._modalService.show<Person, Person>(ModalResultDemoComponent, {
      title: 'Please enter your name'
    }).result()
      .subscribe(person => {
        this.person = person;
      });
  }

  public showLongContent(): void {
    this._modalService.show(ModalLongContentComponent, {
      title: 'Modal with Long Text',
      position: this.modalPosition
    });
  }

  public showWithParam(): void {
    if (this.fruitName) {
      this._modalService.show(ModalWithParameterComponent, {
        title: 'Modal with Params',
        model: this.fruitName
      });
    }
  }
}

@Component({
  template: `<p>Hello from modal!</p>`
})
export class ModalDemoComponent {

}

export interface Person {
  firstName?: string;
  lastName?: string;
}

@Component({
  template: `
  <form #form="ngForm" (ngSubmit)="saveData(form)">
    <div class="mb-3">
      <label for="first-name" class="form-label">First Name</label>
      <input id="first-name" name="firstName" [(ngModel)]="model.firstName" #firstName="ngModel" required class="form-control" />
      <div class="text-danger">
        <div *ngIf="firstName.errors && firstName.errors['required']">
          The First Name field is required.
        </div>
      </div>
    </div>

    <div class="mb-3">
      <label for="last-name" class="form-label">Last Name</label>
      <input id="last-name" name="lastName" [(ngModel)]="model.lastName" #lastName="ngModel" required class="form-control" />
      <div class="text-danger">
        <div *ngIf="lastName.errors && lastName.errors['required']">
          The Last Name field is required.
        </div>
      </div>
    </div>

    <div>
      <button class="btn btn-primary" type="submit">
        Submit
      </button>
    </div>
  </form>
  `
})
export class ModalResultDemoComponent {
  public model: Person = {};

  constructor(private readonly _modalReference: ModalReference<Person, Person>) {
  }

  public saveData(form: NgForm): void {
    if (form.valid) {
      this._modalReference.closeSuccess(this.model);
    }
  }
}

@Component({
  template: `
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id nunc ante. Integer in congue turpis. Donec facilisis nisi felis, vel elementum ipsum placerat vel. Quisque sed maximus felis, et tempor purus. Nam eu mollis ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rutrum mauris ut risus mattis pretium.
  </p>
  <p>
    Suspendisse iaculis maximus quam, eget vulputate lorem consectetur vitae. Integer pretium, tellus ut eleifend gravida, ligula massa varius felis, at auctor lacus justo pretium ante. Duis commodo pretium nibh, eget semper arcu. Nulla nisi tortor, aliquam sit amet accumsan in, vestibulum et magna. Morbi purus ligula, vehicula non orci a, vehicula ullamcorper felis. Nam lobortis ut diam quis egestas. Sed mollis arcu id mi ultricies commodo. Integer eu malesuada nunc, eget dictum tellus. Suspendisse et nisl sit amet est pellentesque ultrices. Phasellus posuere ante vel nisi dapibus, at facilisis tortor scelerisque. Vivamus consectetur, odio nec cursus ultrices, mauris mauris maximus justo, nec pulvinar ligula nisi condimentum ex. Proin suscipit neque sed mi sodales, eget egestas sem pretium. Quisque eu justo accumsan, hendrerit lorem vitae, malesuada sem. Curabitur congue consectetur risus, et consectetur tellus mattis sed. Donec euismod leo quis nunc eleifend, id luctus sapien vestibulum.
  </p>
  <p>
    Nunc elementum, magna quis efficitur placerat, nisl arcu fringilla erat, vel porta tortor erat sit amet tellus. Etiam nec erat mauris. Nunc vel ligula vel elit gravida congue. Aenean auctor feugiat tempor. Nunc scelerisque diam id dapibus vestibulum. Nulla scelerisque luctus venenatis. Proin leo justo, dignissim et tortor at, cursus commodo ligula. Donec rutrum elit ut velit varius, sit amet dapibus lectus laoreet. Suspendisse erat urna, maximus sed leo in, mollis ornare mauris. Maecenas cursus elementum efficitur. Nunc dignissim ullamcorper malesuada. Fusce viverra dolor et libero rutrum pellentesque. Suspendisse eget risus efficitur, suscipit tortor sit amet, feugiat lacus. Suspendisse dignissim ut arcu nec vehicula.
  </p>
  <p>
  Cras aliquam, turpis a fringilla eleifend, magna tellus accumsan odio, sed imperdiet ex lorem sit amet felis. Morbi ullamcorper varius velit, vel volutpat risus sodales sed. Aliquam euismod volutpat ullamcorper. Proin dui lectus, efficitur id sapien et, sagittis malesuada justo. Pellentesque commodo ante fringilla metus auctor, ac laoreet enim maximus. Donec turpis nibh, rhoncus ac facilisis sit amet, hendrerit vitae nunc. Pellentesque ultricies quam ut enim faucibus, quis elementum sapien feugiat. Integer quam leo, sollicitudin a massa in, tincidunt condimentum ipsum.
  </p>
  <p>
    Donec magna purus, interdum non tincidunt ac, euismod sed enim. Phasellus sagittis commodo ipsum et bibendum. Fusce in suscipit justo. Suspendisse vitae consequat dui, sagittis scelerisque mauris. Donec eleifend erat neque, vitae lacinia est accumsan sit amet. Etiam tincidunt vel urna in viverra. In hac habitasse platea dictumst. Vestibulum ornare varius commodo. Quisque quam est, scelerisque fermentum nunc sit amet, varius rutrum urna. Fusce placerat, arcu nec vulputate rutrum, sem mi porttitor quam, nec scelerisque augue massa maximus justo. Mauris at dolor eget tortor aliquet dapibus. Suspendisse efficitur ornare justo, a lacinia dolor imperdiet eu. Proin ac blandit velit.
  </p>
  `
})
export class ModalLongContentComponent {

}

@Component({
  template: `<p>Your favorite fruit is <span class="fw-bold">{{fruitName}}</span></p>`
})
export class ModalWithParameterComponent {
  public fruitName: string;

  constructor(modalReference: ModalReference<string>) {
    this.fruitName = modalReference.config.model;
  }
}