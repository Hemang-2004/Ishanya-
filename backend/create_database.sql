CREATE TABLE Program (
    ProgramID INTEGER PRIMARY KEY,
    ProgramName VARCHAR(20)
);

CREATE TABLE Educators (
    EducatorID CHAR(6) PRIMARY KEY,
    Name VARCHAR(30),
    Photo VARCHAR(100),
    Designation VARCHAR(30),
    ProgramID INTEGER,
    Email VARCHAR(50),
    Phone CHAR(10),
    HighEducationQualification VARCHAR(50),
    DateOfBirth DATE,
    DateOfJoining DATE,
    DateOfLeaving DATE,
    Status VARCHAR(20),
    Tenure INTEGER,
    WorkLocation VARCHAR(50),
    EmergencyContactName VARCHAR(30),
    EmergencyContactNumber CHAR(10),
    BloodGroup VARCHAR(3),
    FOREIGN KEY (ProgramID) REFERENCES Program(ProgramID)
);

CREATE TABLE Students (
    StudentID INTEGER PRIMARY KEY,
    FirstName VARCHAR(30),
    LastName VARCHAR(30),
    DateOfBirth DATE,
    Gender TEXT CHECK(Gender IN ('m', 'f', 'o')),
    Photo VARCHAR(100),
    PrimaryDiagnosis VARCHAR(30),
    Comorbidity VARCHAR(30),
    UDID TEXT CHECK(UDID IN ('yes', 'no')),
    Enrollment YEAR,
    Status TEXT CHECK(Status IN ('active', 'discontinued', 'temp_break')),
    IntegrationType TEXT CHECK(IntegrationType IN ('mainstream_education', 'employment', 'other_institution')),
    EmailID VARCHAR(20),
    ProgramID INTEGER,
    CurrentLevel VARCHAR(20),
    Attendance INTEGER,
    DaysOfWeek TEXT, 
    PrimaryEducatorID CHAR(6),
    SecondaryEducatorID CHAR(6),
    FathersName VARCHAR(30),
    MothersName VARCHAR(30),
    BloodGroup VARCHAR(3),
    Allergies TEXT, 
    ContactNumber CHAR(10),
    AltContactNumber CHAR(10),
    ParentsEmail VARCHAR(50),
    Address VARCHAR(100),
    Transport TEXT CHECK(Transport IN ('yes', 'no')),
    Strengths TEXT, 
    Weaknesses TEXT,
    PreferredLanguage VARCHAR(15),
    AssistiveDevices TEXT,
    LearningStyle TEXT CHECK(LearningStyle IN ('visual', 'auditory', 'kinesthetic', 'mixed')),
    PreferredCommunicationStyle TEXT CHECK(PreferredCommunicationStyle IN ('verbal', 'nonverbal', 'sign', 'picture-based', 'written', 'other')),
    IsRegistered BOOLEAN,
    ParentAnnualIncome INTEGER,
    FOREIGN KEY (ProgramID) REFERENCES Program(ProgramID),
    FOREIGN KEY (PrimaryEducatorID) REFERENCES Educators(EducatorID),
    FOREIGN KEY (SecondaryEducatorID) REFERENCES Educators(EducatorID)
);

CREATE TABLE Assessment (
    AssessmentID INTEGER PRIMARY KEY AUTOINCREMENT,
    StudentID INTEGER,
    AssessmentDate DATE,
    AssessmentTime TIME,
    EducatorID CHAR(6),
    Location VARCHAR(50),
    SuggestedProgram INTEGER,
    Comments TEXT,
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (EducatorID) REFERENCES Educators(EducatorID),
    FOREIGN KEY (SuggestedProgram) REFERENCES Program(ProgramID)
);

CREATE TABLE Feedback (
    StudentID INTEGER,
    EducatorID CHAR(6),
    Date DATE,
    Comments TEXT,
    TPS INTEGER CHECK(TPS BETWEEN 1 AND 5),
    OrganizationPlanning INTEGER CHECK(OrganizationPlanning BETWEEN 1 AND 5),
    TimeManagement INTEGER CHECK(TimeManagement BETWEEN 1 AND 5),
    TaskInitiationCompletion INTEGER CHECK(TaskInitiationCompletion BETWEEN 1 AND 5),
    SelfCareIndependence INTEGER CHECK(SelfCareIndependence BETWEEN 1 AND 5),
    PeerInteraction INTEGER CHECK(PeerInteraction BETWEEN 1 AND 5),
    EmpathyPerspectiveTaking INTEGER CHECK(EmpathyPerspectiveTaking BETWEEN 1 AND 5),
    FocusAttention INTEGER CHECK(FocusAttention BETWEEN 1 AND 5),
    CuriosityInquiry INTEGER CHECK(CuriosityInquiry BETWEEN 1 AND 5),
    PersistenceProblemSolving INTEGER CHECK(PersistenceProblemSolving BETWEEN 1 AND 5),
    CommunicationSkills INTEGER CHECK(CommunicationSkills BETWEEN 1 AND 5),
    ArtisticExpression INTEGER CHECK(ArtisticExpression BETWEEN 1 AND 5),
    MovementPlay INTEGER CHECK(MovementPlay BETWEEN 1 AND 5),
    PRIMARY KEY (StudentID, EducatorID),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (EducatorID) REFERENCES Educators(EducatorID)
);

CREATE TABLE Chat (
    ChatID INTEGER PRIMARY KEY AUTOINCREMENT,
    StudentID INTEGER,
    EducatorID CHAR(6),
    DateTime DATETIME,
    Message TEXT,
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (EducatorID) REFERENCES Educators(EducatorID)
);
