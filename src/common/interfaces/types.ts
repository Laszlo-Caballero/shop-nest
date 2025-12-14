export interface ResponseApi<T> {
  data: T;
  message: string;
  status: number;
  metadata?: Metadata;
  token?: string;
  errors?: string[];
}

interface Metadata {
  totalItems: number;
  itemCount: number;
  totalPages: number;
  currentPage: number;
}

export interface ResponseMetadata<T> {
  data: T;
  metadata?: Metadata;
  token?: string;
}
