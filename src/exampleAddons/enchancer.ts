// import type { StoreEnhancer, StoreCreator, Reducer, PreloadedState, Store } from 'redux'

// type GenericStore = Store<any, any>
// type GenericReducer = Reducer<any, any>
// type GenericPreloadedState = PreloadedState<any>

// // Enhancer that logs "Hi!" every time an action is dispatched
// export const sayHiOnDispatch: StoreEnhancer = (createStore: StoreCreator) => {
//   return (
//     rootReducer: GenericReducer,
//     preloadedState?: GenericPreloadedState,
//     enhancers?: any
//   ) => {
//     const store = createStore(rootReducer, preloadedState, enhancers)

//     function newDispatch(action: any) {
//       const result = store.dispatch(action)
//       console.log('Hi!')
//       return result
//     }

//     return {
//       ...store,
//       dispatch: newDispatch,
//     }
//   }
// }

// // Enhancer that injects a 'meaningOfLife' property into the state
// export const includeMeaningOfLife: StoreEnhancer = (createStore: StoreCreator) => {
//   return (
//     rootReducer: GenericReducer,
//     preloadedState?: GenericPreloadedState,
//     enhancers?: any,
//   ) => {
//     const store = createStore(rootReducer, preloadedState, enhancers)

//     function newGetState() {
//       return {
//         ...store.getState(),
//         meaningOfLife: 42,
//       }
//     }

//     return {
//       ...store,
//       getState: newGetState,
//     }
//   }
// }