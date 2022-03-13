interface ApiDefaultResponse {
  status: string;
  message: string;
}

interface ApiNullResponse {
  status: string;
  message: string;
  data: null;
}

interface ApiEmptyArrayResponse {
  status: string;
  message: string;
  data: [];
}
