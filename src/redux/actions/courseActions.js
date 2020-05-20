export function createCourse(course) {
  //debugger;
  return { type: "CREATE_COURSE", course };
}

//1,必须有type property
//2,porperty 2 是 action payload： course: course 当key和value一样时，可以省略value
