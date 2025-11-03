/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// Context/FormContext.js
import React, { act, createContext, useContext, useReducer } from 'react';

const FormContext = createContext();

const initialState = {
    form1: {},
    form2: {},
    form1Siswa: {},
    form2Siswa: {},
    formMedic: {},
};

const formReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FORM1':
            return { ...state, form1: action.payload };
        case 'UPDATE_FORM2':
            return { ...state, form2: action.payload };
        case 'UPDATE_FORM1SISWA':
            return {...state, form1Siswa: action.payload};
        case 'UPDATE_FORM2SISWA':
            return {...state, form2Siswa: action.payload};
        case 'UPDATE_FORMMEDIC':
            return {...state, formMedic: action.payload};
        case 'RESET_FORM_DATA' :
            return initialState;
        default:
            return state;
    }
};

export const FormProvider = ({ children }) => {
    const [state, dispatch] = useReducer(formReducer, initialState);

    const updateFormData = (formName, data) => {
        if (formName === 'form1') {
            dispatch({ type: 'UPDATE_FORM1', payload: data });
        } else if (formName === 'form2') {
            dispatch({ type: 'UPDATE_FORM2', payload: data });
        } else if (formName === 'form1Siswa') {
            dispatch({ type: 'UPDATE_FORM1SISWA', payload: data});
        } else if (formName === 'form2Siswa') {
            dispatch({ type: 'UPDATE_FORM2SISWA', payload: data});
        }else if(formName === 'formMedic') {
            dispatch({ type: 'UPDATE_FORMMEDIC', payload: data});
        }
    };

    const resetFormData = () => {
        dispatch({type: 'RESET_FORM_DATA'});
    };

    return (
        <FormContext.Provider value={{ state, updateFormData, resetFormData }}>
            {children}
        </FormContext.Provider>
    );
};

export const useFormContext = () => {
    return useContext(FormContext);
};