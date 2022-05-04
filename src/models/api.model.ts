/*
 * Created by Anup Shrestha (anup.stha012@gmail.com)
 * Copyright (c) 2022.  All rights reserved.
 * Last modified 4/28/22, 1:27 PM
 *
 */

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
