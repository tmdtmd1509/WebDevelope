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

console.group('Doctor Who Actor Name Count in Top Rated Episodes');
const nameCount = topRated.reduce(
    (doctorNames, episode) => {
        let foundDoctor = doctorNames.find(
            (doctorName) => doctorName.actor === episode.actor
        );

        if(!foundDoctor) {
            doctorNames.push({
                actor: episode.actor,
                count: 0,
            });
        }

        foundDoctor = doctorNames.find(
            (doctorName) => doctorName.actor === episode.actor
        );

        const foundDoctorIndex = doctorNames.indexOf(foundDoctor);

        doctorNames[foundDoctorIndex].count++;

        return doctorNames;
    },
    []
).sort((a, b) => b.count > a.count);

console.table(nameCount);
console.groupEnd();