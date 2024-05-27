import React, { createContext, useState } from 'react';

export const ExerciseContext = createContext();

export const ExerciseProvider = ({ children }) => {
    const initialExercises = [
        { id: 1, name: "Squats", type: "Legs", bodyPart: "Quadriceps", sets: [] },
        { id: 2, name: "Bench Press", type: "Chest", bodyPart: "Pectorals", sets: [] },
        { id: 3, name: "Deadlifts", type: "Back", bodyPart: "Lower Back", sets: [] },
    ];

    const [predefinedExercises, setPredefinedExercises] = useState(initialExercises);

    return (
        <ExerciseContext.Provider value={{ predefinedExercises, setPredefinedExercises }}>
            {children}
        </ExerciseContext.Provider>
    );
};
