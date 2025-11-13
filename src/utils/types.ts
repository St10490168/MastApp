export interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: string;
}

export const COURSES = ['Starters', 'Mains', 'Desserts'] as const;
export type CourseType = typeof COURSES[number];