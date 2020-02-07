import reducers from 'react-redux'
import {
    GET_MEMORIES, ADD_MEMORY, DELETE_MEMORY, GET_MEMORY_SUBJECT_CATEGORY, GET_MEMORY_FORM, UPDATE_MEMORY_FORM, EMPTY_MEMORIES, FILTER_MEMORIES, CHECK_UNCHECK_CATEGORY
} from "../actions/types";

const initialState = {
    memories: [],
    visibleMemories: [],
    categories: [],
    memoryFormVars: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case EMPTY_MEMORIES:
            return {
                ...state,
                memories: action.payload
            }
        case GET_MEMORIES:  //only called at the very beginning
            return {
                ...state,
                memories: action.payload,
                visibleMemories: action.payload
            }
        case FILTER_MEMORIES:
            console.log("at FILTER_MEMORIES")

            //action.payload   looks like ['building','people']   it contains the categories we want to FILTER OUT
            //state.memories   looks like  [0:{each_memory}, 1:{each_memory}
            //each_memory looks like {...category:1}

            //state.categories looks like {0:"building",1:"people",...}

            // i need to pair up the category number with the index of all categories, then compare to the category string. 

            var categories_updated_check = [...state.categories]
            //var categories_updated_check = state.categories

            var newmemories = [...state.memories]

            //console.log("newmemories", newmemories)
            //console.log("state.memories", state.memories)
            //var newmemories = state.memories



            if (action.payload.length > 0) {
                for (var each_index in newmemories) {
                    var each_memory = newmemories[each_index]
                    // console.log("each_index", each_index)

                    // console.log("now at memory", each_memory)

                    //the thing is, the categories have their own ids, which is the number I use to record what category they are. 
                    //the category ids start at 1
                    //the state.categories which is a dictionary of the categories. Starts at 0
                    //so I put in a -1 to make them equivalent.

                    //very flimsy system, will redo

                    // console.log("each_memory.category - 1", each_memory.category - 1)
                    // console.log("state.categories", state.categories)

                    // console.log("state.categories[each_memory.category - 1]", state.categories[each_memory.category - 1])

                    if (action.payload.includes(state.categories[each_memory.category - 1].category)) {
                        // remove memory from array

                        // console.log("state.categories[each_memory.category].category", state.categories[each_memory.category].category)
                        // console.log("action.payload", action.payload)
                        // console.log("newmemories", newmemories)
                        // console.log("typeof newmemories", typeof newmemories)

                        delete newmemories[each_index]


                        //newmemories.splice(each_index, 1);
                    }
                    console.log("no match")
                }
            }

            console.log("new memories to be sent out of reducer", newmemories)

            //delete memories actually just remain as null, gotta remove them.
            // but I can't seem to just remove them, they stay there, so I'll create a new list and just add it to the list when not null

            //also when doing a for loop through an array through javascript, instead of just giving me what the thing is, it gives me the index
            var newmemories_clean = []

            for (var each_memory in newmemories) {
                if (newmemories[each_memory] !== null) {
                    newmemories_clean.push(newmemories[each_memory])
                }

            }

            console.log("new memories after taking out nulls ", newmemories_clean)

            return {
                ...state,
                visibleMemories: newmemories_clean

            }



        case CHECK_UNCHECK_CATEGORY:

            //action.payload is actually the category string

            var categories_updated_check = [...state.categories]
            //var categories_updated_check = state.categories

            //kind of a mess but the structure is [0:{},1:{}], why not just [{},{}]? who knows
            for (var each_index in categories_updated_check) {

                var each_category = categories_updated_check[each_index]

                if (each_category.category == action.payload) {

                    each_category.checked = !each_category.checked
                }
            }

            return {
                ...state,
                categories: categories_updated_check
            }


        case GET_MEMORY_SUBJECT_CATEGORY:
            console.log("action.payload", action.payload)
            return {
                ...state,
                categories: action.payload
            }

        case DELETE_MEMORY:
            return {
                ...state,
                memories: state.memories.filter(memory => memory.id !== action.payload)
            };
        case ADD_MEMORY:
            return {
                ...state,
                memories: [...state.memories]
            };
        case GET_MEMORY_FORM:
            return {
                ...state,
                memoryFormVars: action.payload
            }
        case UPDATE_MEMORY_FORM:
            return {
                ...state,
                memoryFormVars: action.payload
            }
        default:
            return state

    }
}