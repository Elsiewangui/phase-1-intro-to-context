// Your code here
function createEmployeeRecord(array){
        return{
            firstName : array[0],
            familyName: array[1],
            title:array[2],
            payPerHour:array[3],
            timeInEvents:[],
            timeOutEvents:[]
        }
}
function createEmployeeRecords(arrays){
    let records = arrays.map(arrays => createEmployeeRecord(arrays))
    return records
}

function createTimeInEvent(employeeRecord,dateStamp){
    let [date,time] = dateStamp.split(' ');
    employeeRecord.timeInEvents.push({
        type : "TimeIn",
        hour : parseInt(time,10),
        date : date
    })
    
    return employeeRecord


}
function createTimeOutEvent(employeeRecord,dateStamp){
    let [date,time] = dateStamp.split(' ')
    employeeRecord.timeOutEvents.push({
        type : "TimeOut",
        hour: parseInt(time,10),
        date : date
    })
    
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord,date){
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

    if (timeInEvent && timeOutEvent) {
        let timeIn = parseInt(timeInEvent.hour, 10);
        let timeOut = parseInt(timeOutEvent.hour, 10);
        return (timeOut - timeIn) / 100; 
    } else {
        return 0; 
    }
}

function wagesEarnedOnDate(employeeRecord,date){
    let hoursWorked=hoursWorkedOnDate(employeeRecord,date)
    let amountOwed = employeeRecord.payPerHour
    return hoursWorked * amountOwed


}

function allWagesFor(employeeRecord){
    let datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    return datesWorked.reduce((totalWages, date) => {
    return totalWages + wagesEarnedOnDate(employeeRecord, date);
  }, 0);
    


}

function calculatePayroll(employeeRecords){
    return employeeRecords.reduce((totalPayroll, employeeRecord) => {
        return totalPayroll + allWagesFor(employeeRecord);
      }, 0);
    


}


    

