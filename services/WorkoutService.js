import AsyncStorage from '@react-native-async-storage/async-storage';

class WorkoutService {
    static storageKey = 'workoutData';

    static async getWorkouts() {
        const data = await this.getData();
        return data ? data.workouts : []; 
    }

    static async getData() {
        const json = await AsyncStorage.getItem(this.storageKey);
        return json ? JSON.parse(json) : null;
    }

    static async initializeAppData() {
        const currentData = await AsyncStorage.getItem(this.storageKey);
        if (!currentData) {
            const initialData = {
                exercises: {
                    "1": { id: 1, name: "Squats", type: "Legs", bodyPart: "Quadriceps", sets: [] },
                    "2": { id: 2, name: "Bench Press", type: "Chest", bodyPart: "Pectorals", sets: [] },
                    "3": { id: 3, name: "Deadlifts", type: "Back", bodyPart: "Lower Back", sets: [] },
                    "4": { id: 4, name: "Shoulder Press", type: "Shoulders", bodyPart: "Deltoids", sets: [] }
                },
                workouts: []
            };
            await AsyncStorage.setItem(this.storageKey, JSON.stringify(initialData));
        }
    }

    static async addWorkout(workout) {
        const data = await this.getData();
        if (data && data.workouts) {
            data.workouts.push(workout);
            await AsyncStorage.setItem(this.storageKey, JSON.stringify(data));
        } else {
            console.error("Failed to retrieve data for updating");
        }
    }

    static async deleteWorkout(id) {
        const data = await this.getData();
        const filteredWorkouts = data.workouts.filter(workout => workout.id !== id);
        data.workouts = filteredWorkouts;
        await AsyncStorage.setItem(this.storageKey, JSON.stringify(data));
    }
}

export default WorkoutService;
