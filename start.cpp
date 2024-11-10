#include <cstdlib> // For system()
#include <iostream>

using namespace std;

int main() {
    system("cd Backend && npm start &");
    system("cd Frontend && npm run dev &");

    std::cout << "Both backend and frontend applications are running." << std::endl;
    return 0;
}