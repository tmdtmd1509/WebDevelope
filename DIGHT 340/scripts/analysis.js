
//9.12

//for of
console.group('Doctor Who Actors :: for...of');
for (actor of actors) {
    console.table(actor);
}

console.groupEnd();

///array.map
console.group('Doctor Who Actors :: Array.map()');
actors.map(function (actor) {
    console.table(actor);
});

//same thing as above
//	actors.map((actor) => console.table(actor));
//	or
//	actors.map(actor => console.table(actor));

console.groupEnd();


//full names
console.group('Doctor Who Actors :: Full Name');

const fullName = actors.map(doctor => {
    return `${doctor.first_name} ${doctor.last_name}`;
});
//or
// 	const fullName = actors.map(doctor => `${doctor.first_name} ${doctor.last_name}
// 	(${doctor.tenure_start})`);

console.table(fullName);
console.groupEnd();

//classic era
console.group('Doctor Who Classic Era');
const classicEra = actors.filter(doctor => (doctor.tenure_start < 2005));
console.table(classicEra);
console.groupEnd();

//modern era
console.group('Doctor Who Modern Era');
const modernEra = actors.filter(doctor => (doctor.tenure_start >= 2005));
console.table(modernEra);
console.groupEnd();

//tenure
console.groupCollapsed('Doctor Who Actors Sorted by Length of Tenure');
const longest = actors
    .sort(doctor => ((a, b) => {
    const lastDoctor = ((a.tenure_end - a.tenure_start) <= 0) ? 1: (a.tenure_end - a.tenure_start) <= 0;
const nextDoctor = ((a.tenure_end - a.tenure_start) <= 0) ? 1: (a.tenure_end - a.tenure_start) <= 0;

a.years = lastDoctor;
b.years = lastDoctor;

//if(lastDoctor > nextDoctor) {
//return -1;
//}
//else {
//return 1;
//}

return (lastDoctor > nextDoctor) ? -1 : 1;
}))
.map(doctor => `${doctor.first_name} ${doctor.last_name} [${doctor.years}]`);


console.table(longest);
console.groupEnd();



//first appear
console.groupCollapsed('Doctor who first appeared in the role');
const fastest = actors
    .sort((a, b) => a.tenure_start > b.tenure_start);

console.table(fastest);
console.groupEnd();


//last name
console.groupCollapsed('Doctor who first appeared in the role');
const lastName = actors
    .sort((a, b) => a.last_name > b.last_name);

console.table(lastName);
console.groupEnd();


//how many years an actor has been playing
console.group('Doctor Who Total Years');

const totalYears = actors.reduce(

    (total, doctor) => {
        let difference = 1;

        if (doctor.tenure_end !== null && doctor.tenure_end !== doctor.tenure_start) {
            difference = (doctor.tenure_end - doctor.tenure_start);
        }

        return total + difference;
    },
    0
);
console.log(`${totalYears} years`);
console.groupEnd();



//top rated episodes array
console.group('Doctor Who Actor Name Count in Top Rated Episodes');
const nameCount = topRated.reduce(
    (doctors, episode) => {
        episode.actor
            .split(', ')
            .map(
                (actor) => {
                    const foundDoctor = doctors.find(
                        (doctor) => {
                            return doctor.actor === actor;
                        }
                    )
                    const foundDoctorIndex = doctors.indexOf(foundDoctor);

                    if(!foundDoctor) {
                        doctors.push({
                            actor: actor,
                            count: 1,
                        });
                    } else {
                        doctors[foundDoctorIndex].count++;
                    }
                }
            );
        return doctors;
    },
    []
).sort((a, b) => b.count > a.count);

console.table(nameCount);
console.groupEnd();




