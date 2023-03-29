//Recebe duas tipagens e susbtitui a original pela segunda
export type Replace<T, R> = Omit<T, keyof R> & R; 