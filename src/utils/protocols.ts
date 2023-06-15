export type User = {
    id: number,
    name: string,
    email: string,
    password: string,
    image: string,
    token: string,
};

export type ApplicationError = {
	name: string;
	message: string;
};

export type VerifyId = { id: number };
export type RegisterUser = Omit<User, "token" | "id">;
export type LoginUser = Omit<User, "token" | "id" | "name" | "image">;

export type Post = {
    id: number,
    title: string,
    description: string,
    link: string,
    userId: number,
};

export type EditPost = {
    postId: number,
    title: string,
    description: string,
    link: string,
};

export type CheckId = { id: string, };
export type NewPost = Omit<Post, "id" | "userId">;
export type ValidPost = Omit<Post, "id">

export type Project = {
    id: number,
    name: string,
    instruments: string,
    description: string,
    userId: number,
};

export type EditProject = {
    projectId: number,
    name: string,
    instruments: string,
    description: string,
};

export type NewProject = Omit<Project, "id" | "userId">
export type ValidProject = Omit<Project, "id">
