import { Component, forwardRef, input, model, OnInit } from '@angular/core';
import { InputType } from '../../models/enums/input-type';
import { getErrorMessage, isInvalid } from '../../../validators/field-validator';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent<I> implements OnInit, ControlValueAccessor {
  InputType = InputType;
  type = input.required<InputType>();
  placeholder = input<string>("");
  label = input<string>("");
  min = input<number>();
  max = input<number>();
  maxlength = input<number>();
  options = input<Record<string, any>[]>([]);
  textField = input<string>("name");
  valueField = input<string>("id");
  default = input<string>();
  disabled = model<boolean>(false);

  id: string = "";
  value: string = "";

  get getErrorMessage() {
    return getErrorMessage;
  }

  get isInvalid() {
    return isInvalid;
  }

  #onChange = (value: any) => { };
  #onTouched = () => { };

  ngOnInit(): void {
    this.id = `${this.type.toString().toLowerCase}_${this.label.toString().toLowerCase().replaceAll(" ", "_")}`;
  }

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.#onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.#onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  handleInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.#onChange(val);
  }

  handleBlur(): void {
    this.#onTouched();
  }
}
