import { cookies } from "next/headers";
import { User } from "@/types/user";
import { Note } from "@/types/note";
import { api } from "./api";
import { AxiosResponse } from "axios";

interface FetchNotesParams {
  search?: string;
  page?: number;
  tag?: string;
  perPage?: number;
}

const getServerApi = async () => {
  return api;
};

export const checkSessionServer = async (): Promise<AxiosResponse<User>> => {
  const cookieStore = await cookies();
  const serverApi = await getServerApi();

  const response = await serverApi.get<User>("/auth/session", {
    headers: { Cookie: cookieStore.toString() },
  });

  return response;
};

export const getMeServer = async (): Promise<User> => {
  const cookieStore = await cookies();
  const serverApi = await getServerApi();
  const response = await serverApi.get<User>("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const serverApi = await getServerApi();
  const response = await serverApi.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return response.data;
};

export const fetchNotes = async (
  params?: FetchNotesParams,
): Promise<{ notes: Note[]; totalPages: number }> => {
  const cookieStore = await cookies();
  const serverApi = await getServerApi();
  const response = await serverApi.get<{ notes: Note[]; totalPages: number }>(
    "/notes",
    {
      params,
      headers: { Cookie: cookieStore.toString() },
    },
  );
  return response.data;
};

export const refreshSessionServer = async (): Promise<AxiosResponse<User>> => {
  const cookieStore = await cookies();
  const serverApi = await getServerApi();

  const response = await serverApi.get<User>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response;
};
