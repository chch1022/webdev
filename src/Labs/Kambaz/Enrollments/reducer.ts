import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";

const initialState = {
  enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollUser: (state, { payload: { userId, courseId } }) => {
      // Check if enrollment already exists
      const existingEnrollment = state.enrollments.find(
        (enrollment: any) => 
          enrollment.user === userId && enrollment.course === courseId
      );
      
      // If not enrolled, add new enrollment
      if (!existingEnrollment) {
        state.enrollments = [...state.enrollments, {
          _id: `${userId}-${courseId}`,
          user: userId,
          course: courseId
        }] as any;
      }
    },
    unenrollUser: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter(
        (enrollment: any) => 
          !(enrollment.user === userId && enrollment.course === courseId)
      );
    },
  },
});

export const { enrollUser, unenrollUser } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;