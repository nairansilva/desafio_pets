export interface Owner{
  readonly id?: string;
  name: string;
  email: string;
  phone: string;
  pets?: [];
}

export interface Pet{
  readonly id?: string;
  name: string;
  nickname: string;
  owner_id: string;
  specie_id: number | null | string;
  breed_id: number | null | string;
  owner?: Owner
}
