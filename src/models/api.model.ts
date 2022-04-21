export interface ApiDefaultResponse {
  status: string;
  message: string;
}

export interface ApiNullResponse {
  status: string;
  message: string;
  data: null;
}

export interface ApiEmptyArrayResponse {
  status: string;
  message: string;
  data: [];
}
