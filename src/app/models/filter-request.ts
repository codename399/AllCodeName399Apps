import { OperatorType } from "./enums/operator-type.enum";

export interface FilterRequest {
    key: string;
    value: string;
    operator: OperatorType;
}