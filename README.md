# Onyx Production Reporting and Control Web

Web application for production control and progress reporting within the Onyx platform.

This project supports production supervisors in the execution and control of manufacturing work orders by centralizing progress reports, production notes, material consumption, operators involved, labor hours, and operational totals at the subtask and work order level.

---

## Overview

**Onyx Production Reporting and Control Web** is the web application component of the Onyx platform focused on production execution tracking and operational reporting.

In this solution, the term **“notifications”** refers to **production progress reports** generated during the execution of manufacturing work orders. These notifications are operational records used by production supervisors to document what happened in each subtask of a production order.

Each notification can capture information such as:

- progress percentage reported for a subtask
- production notes or novelties identified during execution
- materials consumed
- operators involved
- labor hours spent
- execution traceability by subtask and work order

The application also consolidates total production data, allowing supervisors to review accumulated information such as:

- total hours worked on a specific subtask
- total quantity consumed of a specific material
- overall execution status of a work order

---

## Business Purpose

The main purpose of this application is to support **production control** through structured reporting and traceability of execution data.

It allows production supervisors to:

- report progress on subtasks
- record operational novelties or observations
- track material consumption
- identify participating operators
- register labor hours
- review accumulated production totals
- manage exceptions that arise during execution

The repository is part of the broader **Onyx** ecosystem, alongside ERP, mobile, and service-based components.

---

## Primary Users

The main users of this application are:

- **Production Supervisors**

They use the system to register execution progress, monitor totals, document exceptions, and keep production work orders updated at the subtask level.

---

## What “Notifications” Means in This System

Within this solution, **notifications** are not generic alerts or messages.

A **notification** is a structured production report that records execution activity for a specific subtask within a production work order.

A notification may include:

- production work order number
- subtask reported
- reported progress percentage
- materials consumed during execution
- operators involved in the activity
- labor hours spent
- notes, observations, or quality-related novelties

For that reason, the application should be understood as a **production reporting and control system**, not as a generic notifications portal.

---

## Key Functional Scope

The web application supports capabilities such as:

- production work order tracking
- subtask-level execution reporting
- progress percentage registration
- materials consumed by subtask
- labor hours recorded by subtask
- operator participation tracking
- production notes and execution observations
- visualization of accumulated production totals
- traceability of execution history across work orders

---

## Core Business Rules

The system includes important control rules tied to production execution:

### 1. Automatic subtask closure
When a supervisor reports **100% completion** for a subtask, the system automatically closes that subtask and prevents additional reporting for it.

### 2. Automatic work order closure
When **all subtasks** of a production work order are completed, the system automatically closes the full work order.

### 3. Controlled exception handling
The application includes additional operational mechanisms for handling real production scenarios that were not originally planned.

---

## Additional Operational Modules

Besides production reporting, the system includes additional modules that allow supervisors to manage execution exceptions:

### Material additions outside engineering planning
Supervisors can register **materials that were not originally included in the engineering planning**, allowing the production record to reflect real consumption during execution.

### Subtask reopening through duplication
If a subtask needs to be reopened due to a **quality issue or execution error**, supervisors can **duplicate the subtask** so the work can continue under controlled traceability.

This supports real-world shop-floor adjustments while preserving the integrity of the original production flow.

---

## Core Business Entities

Based on the current functional scope, the application is centered around the following business concepts:

- **Production Work Order**
- **Subtask**
- **Production Notification (Progress Report)**
- **Material Consumption**
- **Operator Participation**
- **Labor Hours**
- **Execution Notes (Novelties)**
- **Additional Material Registration**
- **Subtask Reopening**

These entities provide the basis for operational traceability and production control.

---

## Typical Workflow

A typical workflow in the application may look like this:

1. A production supervisor opens a production work order.
2. The supervisor selects a specific subtask.
3. The supervisor reports execution progress.
4. The supervisor logs consumed materials.
5. The supervisor identifies the operators involved.
6. The supervisor records labor hours spent on the subtask.
7. The supervisor adds notes or novelties when necessary.
8. The system updates accumulated totals for that subtask and order.
9. If the supervisor reports **100% completion**, the system closes the subtask automatically.
10. If all subtasks are closed, the system closes the production order automatically.
11. If an execution issue arises, the supervisor may register additional materials not planned by engineering or duplicate a subtask to reopen the work under controlled traceability.

---

## Main Objectives

This repository aims to support:

- production execution control
- operational traceability
- structured shop-floor progress reporting
- material consumption visibility
- labor control by subtask
- automatic closure logic for subtasks and work orders
- controlled management of production exceptions
- centralized consultation of accumulated production data

---

## Architecture

The current repository follows a multi-project structure with separate backend and frontend components.

### Server Layer
Handles business logic, data access, calculation of totals, and control rules related to production reporting and closure logic.

### Client Layer
Provides the web interface used by production supervisors to capture, review, and manage execution data.

This separation supports maintainability and scalability.

---

## Current Repository Structure

```text
Onyx_Web_Operations_Portal/
└── Notificaciones_Tecnipalma/
    ├── Notificaciones_Tecnipalma.Server/
    ├── notificaciones_tecnipalma.client/
    ├── ApplicationDbContext.cs
    ├── Usuario.cs
    └── Notificaciones_Tecnipalma.sln
```

---

## Technology Stack

Based on the current repository composition, the project uses:

- **Backend:** C#
- **Frontend:** TypeScript, HTML, CSS, JavaScript
- **Solution Structure:** .NET solution with separate server and client components

This makes the repository suitable for a full-stack production control application.

---

## Configuration Notes

Before using the application in a real environment, review and adapt:

- database connection settings
- database tables names
- environment variables
- authentication configuration
- API endpoint configuration
- frontend environment settings
- deployment parameters
- naming consistency across projects and modules

---

## Important Refactoring Note

Although the external repository already uses the **Onyx** naming convention, the internal solution and project names still preserve the legacy name **Notificaciones_Tecnipalma**.

---

## Recommended Positioning

This repository should be positioned as a **production reporting and control web application** for manufacturing operations.

Its value lies in enabling:

- structured progress reporting by supervisors
- visibility of labor hours and material consumption
- automatic closure of subtasks and production orders
- management of real execution deviations
- traceability of production activity at the subtask level
