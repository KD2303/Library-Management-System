#include <stdio.h>

struct librbooks
{
    int id;
    char name[20];
    int price;
    int publishingyr;
};

int main(){
    struct librbooks book;
    int num;
    printf("enter the number of books :");
    scanf("%d",&num);
    int i = 1;
    while(i <= num) {
        printf("Enter the details of book %d\n", i);
        printf("Enter the id of book %d: ", i);
        scanf("%d",&book.id);
        printf("Enter the name of book %d: ", i);
        scanf("%19s",&book.name);
        printf("Enter the price of book %d: ", i);
        scanf("%d",&book.price);
        printf("Enter the publishing year of book %d: ", i);
        scanf("%d",&book.publishingyr);
        printf("\n");
        char ch;
        printf("Do you want to add more book entries? (y/n): ");
        scanf(" %c",&ch);
        printf("\n");
        if(ch == 'y') {
            i++;
        } else {
            break;
        }
    }
    return 0;
}