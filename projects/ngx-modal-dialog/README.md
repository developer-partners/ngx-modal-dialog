# @developer-partners/ngx-modal-dialog

## Basic Usage

1. Install the libary

```
npm install @developer-partners/ngx-modal-dialog
```

2. Import it in your module:

```
import { ModalModule } from '@developer-partners/ngx-modal-dialog';

@NgModule({
  imports: [
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

3. Inject the ModalService Angular service into your component constructor:

```
constructor(private readonly _modalService: ModalService) {

}
```

4. Use the injected ModalService instance for showing a modal dialog:

```
public createBook(): void {
    this._modalService.show<Book>(CreateEditBookComponent, {
        title: 'Create Book'
    }).result()
        .subscribe(newBook => {
            // newBook is returned when the CreateEditBookComponent calls the ModalReference.closeSuccess function 
            // and passes data to it
            this.books?.push(newBook);
        });
}
```

The `ModalService.show` function accepts 2 parameters. The first parameter is the Angular component to show inside the modal dialog. In the example above, it is `CreateEditBookComponent`. Without a component passed to it, a modal dialog would be just an empty panel overlaying the main screen. The second parameter is an object with options that contain setttings such as title, position, and size of the modal dialog.

&nbsp;
&nbsp;
&nbsp;
## Interacting with Modal Dialog
&nbsp;

The component shown inside the modal dialog body can interact with the modal dialog. It can close the dialog, change its size, position, and a few other properties. To be able to interact with the modal dialog, you have to inject the ModalReference service in your component.

```
import { ModalReference } from "@developer-partners/ngx-modal-dialog";

constructor(private readonly _modalReference: ModalReference<Book>) {
    
}
```

To close the modal dialog using the `ModalReference` service, simply call the `cancel` function.

```
public cancel(): void {
    this._modalReference.cancel();
}
```

To close the modal dialog and indicate a successful result, call the `closeSuccess` function. The `closeSuccess` function can optionally receive a parameter that will be passed back to the component that showed the modal dialog.

```
public saveData(): void {
    this._modalReference.closeSuccess(this.book);
}
```

&nbsp;
&nbsp;
&nbsp;
## Passing Data to Modal Dialog
&nbsp;

When you are showing the modal dialog, you can pass custom data to it. You can use the `model` property of modal options for that.

```
 public editBook(bookToEdit: Book): void {
    this._modalService.show<Book>(CreateEditBookComponent, {
        title: 'Edit Book',
        model: bookToEdit
    }).result()
        .subscribe(editedBook => {
            // editedBook is returned when the CreateEditBookComponent calls the ModalReference.closeSuccess function 
            // and passes data to it
            console.log(editedBook);
        });
}
```

The component shown in the body of the modal dialog (`CreateEditBookComponent` in this example) can use the passed data using `ModalReference.config.model` property

```
import { ModalReference } from "@developer-partners/ngx-modal-dialog";

constructor(private readonly _modalReference: ModalReference<Book>) {
    console.log(this._modalReference.config.model);
}
```
&nbsp;
&nbsp;
&nbsp;
## Credits
Developer Partners, Inc.

[https://developerpartners.com](https://developerpartners.com)

&nbsp;
&nbsp;
&nbsp;
## License
[Apache License 2.0](https://github.com/developer-partners/ngx-modal-dialog/blob/main/LICENSE)
