Alphabetical Testing Script - Clean

Sub BearOrBull()
'Loop through WS
For Each ws In Worksheets
    
    'Define: Summary Table, Beginning Price, Ending Price, Volume Sum, i and j, Last Row
    Dim i As Long
    Dim Last_Row As Long
    Dim Stock_Ticker As String
    Dim Stock_Volume As Double
    Dim Summary_Table_Row As Integer
    Dim Beg_Price As Double
    Dim End_Price As Double
    Dim Year_Change As Double
    Dim Percent_Change As Double
    
    'Summary of Summary Table Def
    Dim SummaryLast As Long
    Dim Max_Percent As Double
    Dim Min_Percent As Double
    Dim Max_Volume As Double
    
    'Assign Values used in for loop
    Stock_Volume = 0
    Summary_Table_Row = 2
    Last_Row = ws.Cells(Rows.Count, 1).End(xlUp).Row

        For i = 2 To Last_Row
            'Case A: Not the Last Row
            If i <> Last_Row Then
            
                 'First Ticker Look Behind
                If ws.Cells(i, 1).Value <> ws.Cells(i - 1, 1) Then
                    'Assign value to beginning price
                    Beg_Price = ws.Cells(i, 3).Value
                 End If
                 
                'Last Ticker Look Ahead
    
                'Option One: Cells are different
                If ws.Cells(i, 1).Value <> ws.Cells(i + 1, 1) Then
                    
                    'Assign values to ticker and add to rolling sum
                    Stock_Ticker = ws.Cells(i, 1).Value
                    Stock_Volume = Stock_Volume + ws.Cells(i, 7).Value
                    
                    'Assign value to end price
                    End_Price = ws.Cells(i, 6).Value
                    
                    'Calculate Yearly Change and % Change
                    Year_Change = (End_Price - Beg_Price)
                    
                    If Beg_Price = 0 Then
                        Percent_Change = Year_Change / 1E-15
                        
                    Else
                        Percent_Change = Year_Change / Beg_Price
                        
                    End If
                    
                    'Print values to summary table
                    ws.Range("I" & Summary_Table_Row).Value = Stock_Ticker
                    ws.Range("J" & Summary_Table_Row).Value = Year_Change
                    ws.Range("K" & Summary_Table_Row).Value = Percent_Change
                    ws.Range("L" & Summary_Table_Row).Value = Stock_Volume
                    
                    'Conditional Formatting for Summary Table
                    If Year_Change < 0 Then
                        ws.Range("J" & Summary_Table_Row).Interior.ColorIndex = 3
                        ws.Range("K" & Summary_Table_Row).Interior.ColorIndex = 3
                        
                    ElseIf Year_Change > 0 Then
                        ws.Range("J" & Summary_Table_Row).Interior.ColorIndex = 10
                        ws.Range("K" & Summary_Table_Row).Interior.ColorIndex = 10
                        
                    End If
                        
                    'Next row in summary table
                    Summary_Table_Row = Summary_Table_Row + 1
                    
                    'Reset Stock Volumeand Price
                    Stock_Volume = 0
                    Beg_Price = 0
                    End_Price = 0
                
                'Option Two: Cells are same
                Else
                    Stock_Volume = Stock_Volume + ws.Cells(i, 7).Value
                    
                End If
        'Case B: It's the Last Row - still want to print to summary table and conditionally format
        Else
            'Assign values to ticker and add to rolling sum
                    Stock_Ticker = ws.Cells(i, 1).Value
                    Stock_Volume = Stock_Volume + ws.Cells(i, 7).Value
                    
                    'Assign value to end price
                    End_Price = ws.Cells(i, 6).Value
                    
                    'Calculate Yearly Changeand % Change
                    Year_Change = (End_Price - Beg_Price)
                    Percent_Change = Year_Change / Beg_Price
                    
                    'Print values to summary table
                    ws.Range("I" & Summary_Table_Row).Value = Stock_Ticker
                    ws.Range("J" & Summary_Table_Row).Value = Year_Change
                    ws.Range("K" & Summary_Table_Row).Value = Percent_Change
                    ws.Range("L" & Summary_Table_Row).Value = Stock_Volume
                    
                    'Conditional Formatting for Summary Table
                    If Year_Change < 0 Then
                        ws.Range("J" & Summary_Table_Row).Interior.ColorIndex = 3
                        ws.Range("K" & Summary_Table_Row).Interior.ColorIndex = 3
                        
                    ElseIf Year_Change > 0 Then
                        ws.Range("J" & Summary_Table_Row).Interior.ColorIndex = 10
                        ws.Range("K" & Summary_Table_Row).Interior.ColorIndex = 10
                    End If
                    
        End If
         
    Next i
    
    'Summary of the Summary Table
    SummaryLast = ws.Range("J" & Rows.Count).End(xlUp).Row
    
    'Assign Values for Max and Min
            Max_Percent = WorksheetFunction.Max(Columns("K"))
            Min_Percent = WorksheetFunction.Min(Columns("K"))
            Max_Volume = WorksheetFunction.Max(Columns("L"))
        
    'Write values to table
            ws.Cells(2, 16).Value = Max_Percent
            ws.Cells(3, 16).Value = Min_Percent
            ws.Cells(4, 16).Value = Max_Volume
    
    'For loop to match the ticker to the value
    Dim j As Long
    
        For j = 2 To SummaryLast
            If Cells(j, 11).Value = Max_Percent Then
                ws.Cells(2, 15).Value = ws.Cells(j, 9).Value
                
            ElseIf Cells(j, 11).Value = Min_Percent Then
                ws.Cells(3, 15).Value = ws.Cells(j, 9).Value
            End If
            
            If Cells(j, 12).Value = Max_Volume Then
                ws.Cells(4, 15).Value = ws.Cells(j, 9).Value
            End If
            
        Next j
        
    ws.Cells.EntireColumn.AutoFit

Next ws
 
End Sub