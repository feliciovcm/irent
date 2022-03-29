interface IUserResponseDTO {
  name: string;
  email: string;
  id: string;
  avatar: string;
  driver_license: string;
  created_at: Date;
  avatar_url(): string;
}

export { IUserResponseDTO };
