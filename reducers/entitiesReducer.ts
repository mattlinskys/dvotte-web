interface State<T, E> {
  entities: T[];
  isFetched: boolean;
  fetchError?: E;
}

type Action<ID, T, E> =
  | {
      type: "fetch-pending";
    }
  | {
      type: "fetch-fulfilled";
      entities: T[];
    }
  | {
      type: "fetch-rejected";
      error: E;
    }
  | {
      type: "remove";
      id: ID;
    };

export const entitiesDefaultState: State<any, any> = {
  entities: [],
  isFetched: false,
};

export const createEntitiesReducer =
  <T, K extends keyof T, E = Error>(
    id: K,
    compareIds: (a: T[K], b: T[K]) => boolean = (a, b) => a === b
  ) =>
  (state: State<T, E>, action: Action<T[K], T, E>): State<T, E> => {
    switch (action.type) {
      case "fetch-pending":
        return {
          ...entitiesDefaultState,
        };
      case "fetch-fulfilled":
        return {
          ...state,
          isFetched: true,
          entities: action.entities,
        };
      case "fetch-rejected":
        return {
          ...state,
          isFetched: true,
          fetchError: action.error,
        };
      case "remove":
        return {
          ...state,
          entities: state.entities.filter(
            (entity) => !compareIds(entity[id], action.id)
          ),
        };
      default:
        return state;
    }
  };
