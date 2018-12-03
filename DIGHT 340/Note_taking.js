const numbers = [1, 3, 124];

const sumNumbers = numbers.reduce(
    (total, num) => total + num, 0);
console.log(sumNumbers);



//9.24
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