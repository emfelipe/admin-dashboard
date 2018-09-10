const addLicence = function(e) {
    let userId = e.target.id;
    console.log('elo', userId)
    e.target.className = 'added';
    e.target.setValue('Adding...');
};

export { addLicence };