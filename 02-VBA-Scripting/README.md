# Week 2


## Objectives
* Understand the fundamental building blocks of all programming languages: variables, arrays, conditionals, loops, and functions.
* Create simple VBA macros to trigger pop ups and change cell values.
* Gain practice in writing VBA subroutines that utilize variables and conditionals.
* Begin to develop essential coding skills of syntax recollection, pattern recognition, problem decomposition, and debugging.
* Understand the basic syntax of a VBA for loop.
* Understand how to utilize for-loops in conjunction with conditionals to direct logic flow.
* Understand the value of a nested for-loop and gain basic proficiency in their use.
* Refine fundamental coding skills (syntax recollection, pattern recognition, problem decomposition, and debugging).
* Be comfortable formatting spreadsheets using VBA code.
* Understand how to loop through a table using VBA code and check for changes in values.


### Lesson 1: Very VBA 
* Understand the fundamental building blocks of all programming languages: variables, arrays, conditionals, loops, and functions
* Understand how to create simple VBA macros to trigger pop ups and change cell values
* Gain practice in writing VBA subroutines that utilize variables and conditionals
* Develop their essential coding skills of syntax recollection, pattern recognition, problem decomposition, and debugging


**Additional Resources**  


### Lesson 1: Very VBA 
* Understand the fundamental building blocks of all programming languages: variables, arrays, conditionals, loops, and functions
* Understand how to create simple VBA macros to trigger pop ups and change cell values
* Gain practice in writing VBA subroutines that utilize variables and conditionals
* Develop their essential coding skills of syntax recollection, pattern recognition, problem decomposition, and debugging


**Additional Resources**  


* 01-Ins_HelloWorld  
    * First module (ie subroutine)
    * for VBA subroutine must start with `Sub` and end with `End Sub`
    
    ```vbs
    Sub HelloWorld():
        MsgBox("Hello World")
    End Sub
    ```
    
    * `HelloWorld()` is the name of the subroutine. the empy brackets indicate subroutine takes no arguments.
    * `MsgBox` will display a message box in excel when macro is executed
    
* 02-Stu_HelloVBA  
* 03-Ins_ButtonClicks  
    * GUI inserting a button / assigning a Macro in order to kick off an event.  
    
* 04-Stu_ChooseYourButton  
* 05-Ins_CellsAndRanges  --**building block of homework**--
    * Two primary ways to navigate workbook using vba code:
        1. `Cells` which is based on a numeric coordinate0based method for referencing cells of a spreadsheet `(Row,Column)` format. Allow developer to capture single cell at a time example 
        2. `Range` typical way cells referred in excel "F5:F7" example. Allows us to capture multiple cells at once. 
        
        ```vbs
            ' this is written using Cells() function
            Cells(2,1).Value = "Cat"
        ```


        ```vbs
            ' this is written using Range() function
            Range("B1").Value = "Cat"
        ```
        
    * `.Value` method captures the entire content value of the "Cell Object" includinig formatting, style, and other aspects.
    
* 06-Stu_ChessBoard  --**building block of homework**--
* 07-Ins_Variables  --**building block of homework**--
    * VBA (`'`) single quote allows you to comment code for ease of reading and to help others understand what you are doing
    * to declare a variable you use the keywork `Dim` followed by name of variable and then defining the type of information to expect `( As String, As Int, As Double, etc)`
    
* 08-Stu_TotalCalculator  
* 09-Ins_Arrays  --**building block of homework**--  
    * `Arrays` are a common building block of coding.  Arrays in VBA use "zero-based" numbering.  Meaning first element is 0.  
    
* 10-Ins_Splitting  --**building block of homework**--
    * `Split` method breaks apart strings based on a provided delimiter.
    * Can assign an array to a Dim variable by using open ().  Example
    
    ```vbs
        Dim Words() as String
     ```
* 11-Stu_SentenceBreaker  
* 12-Ins_Conditionals  --**building block of homework**--
    * In VBA, the syntax for conditionals involves: `If` `Then` and `End If`. Additional keywords include `ElseIf` and `Else`.
    * In VBA, we can combine conditions using the keywords `And` and `Or`.  

    ```vbs
      If Range("A2").Value > Range("B2").Value Then
          MsgBox ("Num 1 is greater than Num 2")
      End If

      ' Simple Conditional with If, Else, and Elseif
      ' ------------------------------------------
      If Range("A5").Value > Range("B5").Value Then
          MsgBox ("Num 3 is greater than Num 4")

      ElseIf Range("A5").Value < Range("B5").Value Then
          MsgBox("Num 4 is greater than Num 3")

      Else
          MsgBox("Num 3 and Num 4 are equal")

      End If
    ```
    
* 13-Stu_ChooseYourStory


### Lesson 2: Vexing VBA
* Understand the basic syntax of a VBA for loop
* Understand how to utilize for-loops in conjunction with conditionals to direct logic flow
* Understand the value of a nested for-loop and gain basic proficiency in their use
* Refine their fundamental coding skills (syntax recollection, pattern recognition, problem decomposition, and debugging)


**Additional Resources**  
[Fizz Buzz](https://www.101computing.net/fizz-buzz-game-algorithm/)  
[Nested for Loops Examples](https://www.bluepecantraining.com/portfolio/excel-vba-for-next-loops/)  


    * 01-Stu_Warmup  
    * Break the problem down procedurally
* 02-Ins_ForLoops  **--building blocks homework--**
    * three things needed in any loop statement:
        * `counter` which initializes with a certain value `i`in this case of below example
        * ` exit condition` which is criteria under which the loop stops `i = 20`
        * `iterator` increments counter by small amount on each successive loop unitl reaches exit condition. `next i`
        ```vbs
        For i = 1 to 20
            Cells(i,1).Value = 1
        Next i
        ```
* 03-Stu_ChickenNuggets  
    * your turn
    
* 04-Ins_LoopConditionals **--building blocks homework--**
    * Critical coding logic for students to grasp Loop / Conditionals.  
        * Start out by creating a basic `Loop` structure creating a iterator, counter, and exit condition
        * `Conditional` statement follows in this case `if-else` statements to route logic flow based on value of `i` being even or odd
            * `Mod` - modulus performs long division on a number and returns the remainder
        * For VBA specifically do not forget to include `End If` and `Next i` to close respective block of code
        ```vbs
        Sub conditional_loops()

        ' Create a for loop from 1 to 10
        For i = 1 To 10

        ' Use the modulus function to determine if a number is divisible by 2 (even number)
        If Cells(i, 1).Value Mod 2 = 0 Then

            ' Enter "Even Row" the adjacent cell
            Cells(i, 2).Value = "Even Row"
            
        ' If the number is not divisible by 2 (odd number)
        Else

            ' Enter "Even Row" the adjacent cell
            Cells(i, 2).Value = "Odd Row"
            
        ' Close the If/Else Statement
        End If

        Next i

        End Sub
        ```
* 05-Stu_FizzBuzz
    * This is a classical interview question --across all programming languages! 
    
* 06-Stu_Lotto **--Homework--**
    * Good practice breaking down a problem.  Only loop thrown is `Exit for` which allows you to breack out of for loop early if condition is met.  
    
* 07-Ins_NestedForLoops  **--Homework--**  
    * Critical coding logic nested for loops!
    * Goal is to loop through both rows and columns.  
    ```vbs
        
    ' Nested For Loop

    Sub ClassScanner()

        Dim TargetStudent As String

        ' Loop through the rows
        For i = 1 To 3

            ' Loop through the columns
            For j = 1 To 5

                ' Print the Student Name
                MsgBox ("Row: " & i & " Column: " & j & " | " & Cells(i, j).Value)

            Next j

        Next i

    End Sub
    ```
* 08-Stu_HornetsNest  
    * probably one of my favorite logic problems.  Count / find / replace.  Happens in real world all of the time when cleaning dirty data!



### Lesson 3: Victorious VBA
* Fill comfortable formatting spreadsheets using VBA code
* Understand how to loop through a table using VBA code and check for changes in values


**Additional Resources**  
[Excel Color Palette](http://dmcritchie.mvps.org/excel/colors.htm)  
[Looping through Workbook Worksheets](https://support.microsoft.com/en-us/help/142126/macro-to-loop-through-all-worksheets-in-a-workbook)  


* 01-Stu_StarsCounter  **--homework (Finding Total and Grand Total)--**

* 02-Ins_Formatter  **--Basic Homework (Conditional Formatting)--**
    * Use VBA to change the formatting of cells.  

    ```vbs
    Sub formatter()
        ' Set the font color to Red
        Range("A1").Font.ColorIndex = 3
        
        ' Set the Cell Colors to Red
        Range("A2:A5").Interior.ColorIndex = 3
     ```
    
    * Excel has split color paletter up into 56 colors giving each of them a corresponding numeric value.
* 03-Stu_Gradebook  **--Basic Homework (Conditional Formatting)--**

* 04-Stu_Checkerboard  

* 05-Ins_NextCells  
    * Example of how to compare series of rows and whether they contain seperate values
    
    ```vbs
            Sub NextCells()
          ' Loop through rows in the column
          For j = 1 To 3

          For i = 2 To 6

                    If Cells(i, j).Value = "Texas" Then
                        Cells(i, j).Interior.ColorIndex = 43
                    End If

                    If Cells(i, j).Value = "New York" Then
                        Cells(i, j).Interior.ColorIndex = 3
                    End If

                    If Cells(i, j).Value = "Nebraska" Then
                        Cells(i, j).Interior.ColorIndex = 6
                    End If

            ' Searches for when the value of the next cell is different than that of the current cell
            If Cells(i + 1, j).Value <> Cells(i, j).Value Then

              ' Message Box the value of the current cell and value of the next cell
              MsgBox (Cells(i, j).Value & " and then " & Cells(i + 1, j).Value)

            End If

          Next i
            ' change last cell in row to correct state color
                    If Cells(i, j).Value = "Texas" Then
                        Cells(i, j).Interior.ColorIndex = 43
                    End If

                    If Cells(i, j).Value = "New York" Then
                        Cells(i, j).Interior.ColorIndex = 3
                    End If

                    If Cells(i, j).Value = "Nebraska" Then
                        Cells(i, j).Interior.ColorIndex = 6
                    End If

            Next j
        End Sub
    ```
        
* 06-Stu_CreditCardChecker  

* 07-Stu_WellsFargo_Pt1  **--Advanced Homework--**

* 08-Stu_WellsFargo_Pt2  **--Advanced Homework--**

* Extra Content
    * 07-Ins_Multisheet - not very helpful I would ignore
    * 08-Ins_Multifunction - workbook showing use of use `worksheetfunction` to find stats on data set
    * 09-Stu_MultiGames - additional practice manipulating workbooks and creating summarizations using vba


# Unit 2 | Assignment - The VBA of Wall Street

## Background

You are well on your way to becoming a programmer and Excel master! In this homework assignment you will use VBA scripting to analyze real stock market data. Depending on your comfort level with VBA, choose your assignment from Easy, Moderate, or Hard below.

### Files

* [Test Data](Resources/alphabetical_testing.xlsx) - Use this while developing your scripts.

* [Stock Data](Resources/Multiple_year_stock_data.xlsx) - Run your scripts on this data to generate the final homework report.

### Stock market analyst

![stock Market](Images/stockmarket.jpg)

### Easy

* Create a script that will loop through one year of stock data for each run and return the total volume each stock had over that year.

* You will also need to display the ticker symbol to coincide with the total stock volume.

* Your result should look as follows (note: all solution images are for 2015 data).

![easy_solution](Images/easy_solution.png)

### Moderate

* Create a script that will loop through all the stocks for one year for each run and take the following information.

  * The ticker symbol.

  * Yearly change from opening price at the beginning of a given year to the closing price at the end of that year.

  * The percent change from opening price at the beginning of a given year to the closing price at the end of that year.

  * The total stock volume of the stock.

* You should also have conditional formatting that will highlight positive change in green and negative change in red.

* The result should look as follows.

![moderate_solution](Images/moderate_solution.png)

### Hard

* Your solution will include everything from the moderate challenge.

* Your solution will also be able to return the stock with the "Greatest % increase", "Greatest % Decrease" and "Greatest total volume".

* Solution will look as follows.

![hard_solution](Images/hard_solution.png)

### CHALLENGE

* Make the appropriate adjustments to your script that will allow it to run on every worksheet, i.e., every year, just by running it once.

* This can be applied to any of the difficulties.

### Other Considerations

* Use the sheet `alphabetical_testing.xlsx` while developing your code. This data set is smaller and will allow you to test faster. Your code should run on this file in less than 3-5 minutes.

* Make sure that the script acts the same on each sheet. The joy of VBA is to take the tediousness out of repetitive task and run over and over again with a click of the button.

## Submission

* To submit please upload the following to Github:

  * A screen shot for each year of your results on the Multi Year Stock Data.

  * VBA Scripts as separate files.

* After everything has been saved, create a sharable link and submit that to <https://bootcampspot-v2.com/>.

- - -

### Copyright

Coding Boot Camp © 2019. All Rights Reserved.
