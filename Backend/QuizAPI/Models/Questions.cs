﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models
{
    public class Questions
    {
        [Key]
        public int QnId { get; set; }
        [Column(TypeName= "nvarchar(250)")]
        public string QnInWords { get; set; }
        [Column(TypeName ="nvarchar(500)")]
        public string? qImage { get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string Option1 {  get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string Option2 {  get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string Option3 {  get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string Option4 {  get; set; }
        [Column(TypeName = "nvarchar(500)")]
        public string Answer { get; set; }
    }
}
