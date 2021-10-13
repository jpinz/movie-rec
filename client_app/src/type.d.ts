interface IGenre {
    id: number
    name: string
}


type GenreState = {
    wanted: IGenre[]
    not_wanted: IGenre[]
}

type GenreAction = {
    type: string
    genre: IGenre
}

type DispatchType = (args: GenreAction) => GenreAction